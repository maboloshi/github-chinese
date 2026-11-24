'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const MAX_BATCH_ITEMS = 100;
const MAX_BATCH_CHARACTERS = 45000;
const MAX_ATTEMPTS = 3;
const PLACEHOLDER_PATTERN = /\{\{[\s\S]*?\}\}|\$\{[^{}]+\}|\{[A-Za-z_][\w.-]*\}|%\([^)]+\)[a-zA-Z]|%(?:\d+\$)?[+#0\-]*(?:\d+|\*)?(?:\.(?:\d+|\*))?[a-zA-Z]|\$\([^)]+\)|:[A-Za-z_][\w-]*/g;

class TranslationTask {
    constructor(parts) {
        this.parts = parts;
    }
}

function addTextParts(parts, text) {
    const match = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (match[1]) parts.push({ literal: match[1] });
    if (match[2]) parts.push({ text: match[2] });
    if (match[3]) parts.push({ literal: match[3] });
}

function createTemplate(value, tasks) {
    if (typeof value === 'string') {
        const parts = [];
        let lastIndex = 0;
        for (const match of value.matchAll(PLACEHOLDER_PATTERN)) {
            if (match.index > lastIndex) {
                addTextParts(parts, value.slice(lastIndex, match.index));
            }
            parts.push({ placeholder: match[0] });
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < value.length) {
            addTextParts(parts, value.slice(lastIndex));
        }
        const task = new TranslationTask(parts);
        tasks.push(task);
        return task;
    }

    if (Array.isArray(value)) {
        return value.map(item => createTemplate(item, tasks));
    }
    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, createTemplate(item, tasks)]),
        );
    }
    return value;
}

function splitLongText(text, maxLength = MAX_BATCH_CHARACTERS) {
    const chunks = [];
    let chunk = '';
    for (const character of text) {
        if (chunk.length + character.length > maxLength) {
            chunks.push(chunk);
            chunk = '';
        }
        chunk += character;
    }
    if (chunk) chunks.push(chunk);
    return chunks;
}

function makeBatches(texts) {
    const batches = [];
    let batch = [];
    let characters = 0;

    for (const text of texts) {
        for (const chunk of splitLongText(text)) {
            if (batch.length >= MAX_BATCH_ITEMS || characters + chunk.length > MAX_BATCH_CHARACTERS) {
                batches.push(batch);
                batch = [];
                characters = 0;
            }
            batch.push(chunk);
            characters += chunk.length;
        }
    }
    if (batch.length) batches.push(batch);
    return batches;
}

async function translateJsonValue(value, translateBatch) {
    const tasks = [];
    const template = createTemplate(value, tasks);
    const textParts = tasks.flatMap(task => task.parts.filter(part => 'text' in part).map(part => part.text));
    const translatedParts = textParts.length ? await translateBatch(textParts) : [];

    if (!Array.isArray(translatedParts) || translatedParts.length !== textParts.length
        || translatedParts.some(text => typeof text !== 'string')) {
        throw new Error('Translator returned an unexpected number or type of translations.');
    }

    let partIndex = 0;
    for (const task of tasks) {
        for (const part of task.parts) {
            if ('text' in part) {
                part.translated = translatedParts[partIndex];
                partIndex += 1;
            }
        }
    }

    function resolve(node) {
        if (node instanceof TranslationTask) {
            return node.parts.map(part => {
                if ('placeholder' in part) return part.placeholder;
                if ('literal' in part) return part.literal;
                return part.translated;
            }).join('');
        }
        if (Array.isArray(node)) return node.map(resolve);
        if (node !== null && typeof node === 'object') {
            return Object.fromEntries(Object.entries(node).map(([key, item]) => [key, resolve(item)]));
        }
        return node;
    }

    return resolve(template);
}

function createAzureTranslator({ apiKey, region, sourceLanguage, endpoint, fetchImpl = fetch, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
    if (!apiKey) throw new Error('Azure Translator API key is required.');
    if (!region) throw new Error('Azure Translator region is required.');

    let url;
    try {
        url = new URL(endpoint);
    } catch {
        throw new Error('Azure Translator endpoint must be a valid HTTPS URL.');
    }
    if (url.protocol !== 'https:') {
        throw new Error('Azure Translator endpoint must use HTTPS.');
    }
    url.pathname = `${url.pathname.replace(/\/+$/, '')}/translate`;
    url.searchParams.set('api-version', '3.0');
    url.searchParams.set('to', 'zh-Hans');
    url.searchParams.set('from', sourceLanguage || 'en');

    return async function translateBatch(texts) {
        const translations = [];
        for (const batch of makeBatches(texts)) {
            let response;
            for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
                response = await fetchImpl(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Ocp-Apim-Subscription-Key': apiKey,
                        'Ocp-Apim-Subscription-Region': region,
                    },
                    body: JSON.stringify(batch.map(Text => ({ Text }))),
                });
                if (response.ok || ![429, 500, 502, 503, 504].includes(response.status) || attempt === MAX_ATTEMPTS) {
                    break;
                }
                const retryAfter = Number(response.headers.get('retry-after'));
                await sleep(Number.isFinite(retryAfter) && retryAfter > 0
                    ? Math.min(retryAfter * 1000, 10000)
                    : 250 * (2 ** (attempt - 1)));
            }

            if (!response.ok) {
                const details = (await response.text()).replaceAll(apiKey, '[REDACTED]');
                throw new Error(`Azure Translator request failed (${response.status}): ${details || response.statusText}`);
            }

            let result;
            try {
                result = await response.json();
            } catch {
                throw new Error('Azure Translator returned invalid JSON.');
            }
            if (!Array.isArray(result) || result.length !== batch.length
                || result.some(item => typeof item?.translations?.[0]?.text !== 'string')) {
                throw new Error('Azure Translator returned an unexpected response format.');
            }
            translations.push(...result.map(item => item.translations[0].text));
        }
        return translations;
    };
}

function getRequiredInput(env, name) {
    const value = env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`]?.trim();
    if (!value) throw new Error(`Missing required action input: ${name}`);
    return value;
}

function getOptionalInput(env, name) {
    return env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`]?.trim();
}

async function runAction({ env = process.env, cwd = process.cwd(), fetchImpl, logger = console } = {}) {
    const inputFile = path.resolve(cwd, getRequiredInput(env, 'input-file'));
    const outputFile = path.resolve(cwd, getRequiredInput(env, 'output-file'));
    const sourceLanguage = getOptionalInput(env, 'source-language') || 'en';
    const translator = createAzureTranslator({
        apiKey: getRequiredInput(env, 'api-key'),
        region: getRequiredInput(env, 'region'),
        sourceLanguage,
        endpoint: getOptionalInput(env, 'endpoint') || 'https://api.cognitive.microsofttranslator.com',
        fetchImpl,
    });

    let source;
    try {
        source = await fs.readFile(inputFile, 'utf8');
    } catch (error) {
        throw new Error(`Could not read input JSON file "${inputFile}": ${error.message}`, { cause: error });
    }
    let value;
    try {
        value = JSON.parse(source);
    } catch (error) {
        throw new Error(`Input file "${inputFile}" is not valid JSON: ${error.message}`, { cause: error });
    }

    const translated = await translateJsonValue(value, texts => translator(texts));
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, `${JSON.stringify(translated, null, 2)}\n`, 'utf8');
    logger.info(`Translated JSON written to ${outputFile}`);
}

if (require.main === module) {
    runAction().catch(error => {
        console.error(`Azure JSON translation failed: ${error.message}`);
        process.exitCode = 1;
    });
}

module.exports = {
    createAzureTranslator,
    makeBatches,
    runAction,
    splitLongText,
    translateJsonValue,
};
