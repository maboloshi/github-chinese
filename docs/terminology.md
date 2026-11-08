# 术语一致性：一张表、一道门、一支棘轮

`locals.js` 有 6.9 万条词条、1.4 万个唯一英文键。同一个英文键在不同页面被译成两种写法的现象很难靠肉眼发现，也很难靠 review 拦住。

本机制只做三件事：**把「正确译法」写成一张表**（`docs/terms.json`）、**用脚本按表校验词库**（`script/check-terms.mjs`）、**用基线只拦新增**（`docs/terms-baseline.json`）。zh-TW 侧的 `t2s_rules.conf` 是同一思路的先例，只是它负责简繁转换，这里负责译法裁决。

## 现状（2026-11 扫描）

- 69,533 条词条 / 14,442 个唯一英文键 / 13,597 个唯一中文串（平均一个中文串复用 5 次）。
- 702 个键存在 ≥2 种译法；其中 472 个是短标签键（导航、按钮、表头）。
- 典型漂移：

| 键 | 并存译法 | 位置 |
|---|---|---|
| `Actions` | `Actions`（保留英文） / `操作` | `locals.js:21364` |
| `Credentials` | `凭证` ×46 / `凭据` ×3 | `locals.js:465` |
| `Visibility` | `可见性` / `可见度` | `locals.js:26929` |
| `Pending` | `未决` / `待处理` | `locals.js:1522` |
| `Sessions` | `会话` / `智能体任务` | `locals.js:31039` |

## 三个文件

| 文件 | 作用 |
|---|---|
| [`docs/terms.json`](terms.json) | 术语表，唯一数据源；改术语只改这里 |
| [`script/check-terms.mjs`](../script/check-terms.mjs) | 检查器；有新增违规时退出码 1 |
| [`script/analyze-variants.mjs`](../script/analyze-variants.mjs) | 变体分析器：词级 / 模板 / 同键 / 短键扫描 |
| [`docs/terms-baseline.json`](terms-baseline.json) | 存量豁免清单；只应随修正而收缩 |

## 术语怎么写

```json
{
  "id": "star",
  "labels": ["Star"],
  "words": ["star"],
  "zh": "标星",
  "forbid": ["星标"],
  "severity": "warn",
  "note": "按钮/动作（Star this repository）用「标星」，名词「星标」见 stars。"
}
```

- `labels`：精确英文键，标签规则只校验这些键（不做键名模糊匹配，避免「代码库=codebase」被误报）。
- `words`：可选。键名含该词的长句也扫描禁用译法。
- `zh`：期望译法。`labels` 的取值必须与它**完全相等**。
- `forbid`：禁用译法。标签规则按**整值相等**匹配；长句规则按**包含**匹配。
- `severity`：`error` 计入阻断；`warn` 只提示（用于「同词不同上下文」这类没法一刀切的术语）。
- `overrides`：可选，按段落覆盖译法与禁用词，见下节。
- `note`：报告里展示给贡献者的理由。

## 三档输出

```text
✖ 新增违规 N 处（会被 CI 阻断）        → 退出码 1
⚠ 待裁定 N 处（不阻断）                 → severity: warn
⚠ 长句中的禁用译法 N 处（不阻断）       → 建议，不是门禁
⚠ 标签分歧 N 个键（多数派 ≥80%）        → 扩充术语表的候选清单
```

`--all` 显示全部提示项；`--dict <file>` 可校验其他词库文件。

## 日常怎么用

**贡献词条**：照常编辑 `locals.js`，提交前跑一次：

```bash
node script/check-terms.mjs
```

**新增术语**：先看候选清单，再写进 `docs/terms.json`：

```bash
node script/check-terms.mjs --all
```

「标签分歧」列出的是同一短键的多数派与少数派（如 `Off (74) 关闭×73 | 禁用×1`），裁定后把多数派写进 `zh`，即可让它从提示变成阻断。

**修完存量**：检查报告会提示「基线中有 N 条已失效」，执行：

```bash
node script/check-terms.mjs --update-baseline
```

基线只允许这样收缩。**新增违规一律改词条，不许加基线**——这是这套机制的底线。

## 同一个词、不同语境怎么办

先判断差异属于哪一类，处理方式完全不同：

| 类型 | 判别方法 | 处理方式 |
|---|---|---|
| **两页各有独立字面量** | 两个 section 里各能找到 `"键": "值"` | 术语表加 `overrides`（`sectionPrefix` 最长匹配） |
| **一个 section 被多页复用** | `I18N["zh-CN"]["a"] = I18N["zh-CN"]["b"]`，或段落里 `...spread` 了别的段落 | 词条本身只有一个值，**结构上分不开**：统一译法，或拆段落（改动大） |
| **词性/语义本来就不同** | `Star` vs `Stars`、`Fork` vs `Forks` | 拆成多个 `id`，各管各的 |
| **术语 vs 普通名词** | 同一个英文词在长句里是普通名词 | 只对精确标签键生效，`words` 词根扫描刻意不覆盖这类词 |
| **取决于整句语义** | `run` → 运行/执行、`support` → 支持/支撑 | 术语表不管，交给人工 review |

段落级覆盖的写法：

```json
{
  "id": "example",
  "labels": ["Example"],
  "zh": "通用译法",
  "forbid": ["混用译法"],
  "overrides": [
    { "sectionPrefix": "orgs/", "zh": "组织页译法", "forbid": ["通用译法"] }
  ]
}
```

- 每个条目按命中前缀里**最长的那个**取生效值：`repository/settings/rules` 同时命中 `repository/` 与 `repository/settings` 时取后者。
- `labels` 可限定覆盖只对某个键生效——同一段落里 `Archive`（动作）与 `Archives`（归档文件）语义不同时必需。
- `overrides` 里的 `forbid` 可省略，省略时沿用术语级 `forbid`。
- 报告会标出来源：`[example] Example → 「通用译法」，应为「组织页译法」  …（覆盖：orgs/）`。

现有条目里的用法：

| 术语 | 覆盖 | 理由 |
|---|---|---|
| `sessions` | `repository/agents` → 智能体会话 | agent 会话与普通会话分开；`agent task` 仍译「智能体任务」 |
| `active` | `settings/appearance` → 已启用、`repository/settings/hooks` → 激活、`repository/agents` → 进行中 | 同一个 Active 在开关/钩子/运行态语境下不是「活跃」 |
| `archive` | `repository/settings` + `labels: ["Archives"]` → 归档文件 | 该页指归档文件本身，不是「归档」动作 |
- 覆盖前缀没命中任何段落时，检查器会提示，避免写死的空条目。

### 真实案例：为什么 `Policies` 没有直接用 override

`repository/settings/rules` 继承了组织设置菜单：

```js
I18N["zh-CN"]["repository/settings/rules"] = {
    "static": {
        ...I18N["zh-CN"]["orgs-settings-menu"]["static"], // ← "Policies": "政策" 来自这里
```

而 `orgs/settings/rules` 又直接复用同一个对象（`locals.js:19334`）。**一个 section 同时服务仓库页和组织页**，改字面量会误伤另一边，加 override 也只会把继承来的值判成违规。要彻底分开必须先拆段落，成本高于收益，所以 `Policies` 保持 `warn` + `note`。

## 基线纪律

- `docs/terms-baseline.json` 里的每一条都代表一处**已知未修**的漂移，review 时看它的 diff 即可判断有没有人偷偷放水。
- 基线按「术语 + 键 + 值」记录，不含行号，所以词库增删行不会让基线抖动。
- 基线**不含段落**：同一键同一错译只记一条，修好一处就等于修好该键的全部同类问题。代价是「某段落已豁免的同值错译，换到新段落也会被豁免」；要精确到段落就得接受 spread 副本反复触发，取舍如此。

## 短语模板规则

固定句式也能变成规则。`docs/terms.json` 的 `phrases` 数组：

```json
{
  "id": "learn-more-about",
  "match": "Learn more about",
  "prefix": "了解更多关于",
  "allow": ["^了解如何", "^点击此处了解更多关于", "^深入了解"],
  "severity": "error"
}
```

- `match`：英文键前缀，忽略大小写。
- `prefix`：译文必须以它开头；比较前会去掉句末标点。
- `allow`：命中这些正则的条目不检查，用于「了解如何…」这类同样合理的写法。
- `forbid`：可选，译文不得包含这些片段（与 `prefix` 二选一或并用）。
- `severity`：同术语规则，`error` 计入阻断。

现有规则：

| id | match | prefix | allow |
|---|---|---|---|
| learn-more-about | Learn more about | 了解更多关于 | 了解如何 / 点击此处… / 深入了解 |
| are-you-sure | Are you sure | 您确定要 | 您确定吗 / 您确定不希望 |
| unable-to | Unable to | 无法 | 抱歉 |
| you-are-about-to | You are about to | 您即将 | 您将 |
| you-must | You must | 您必须 | — |
| this-action | This action | 此操作 | — |
| no-matching | No matching | 没有匹配 | — |

`Learn more about` 一轮统一了 18 处；`Are you sure` 顺带抓到一个错字（「您确定哇?」→「您确定吗？」）；`This action` 收掉 2 处「该操作」，`No matching` 收掉 3 处「无匹配 / 暂无匹配」。

不是所有句式都值得收编：`Failed to …` 的 11 条里有 7 条用「X 失败」句式，改成「无法 X」等于整句重写；`This will`、`You can` 这类前缀覆盖率只有 6-7 成，属于对象不同而非模板漂移。

## 全域禁用词（`banned`）

不限定键名、任何译文里出现即违规，适合「帐户 / 你 / 交互」这类字符级替换：

```json
{
  "id": "you-formal",
  "match": "你",
  "allow": ["迷你", "你好"],
  "severity": "error"
}
```

- `match`：译文中不得出现的字符串。
- `allow`：命中即放行的正则（如「迷你」里的「你」）。
- `keyMatch`：可选，只在键名匹配该正则时检查。
- 与 `phrases` 的区别：`phrases` 管「句式开头」，`banned` 管「全库字符」。

## 非术语与短语的变体分析

词库 6.9 万条，逐条读进上下文不现实。[`script/analyze-variants.mjs`](../script/analyze-variants.mjs) 在本地算完，只回传聚合摘要：

```bash
node script/analyze-variants.mjs --word email                    # 一个词的译法分布
node script/analyze-variants.mjs --template "Learn more about"   # 短语的译文模板
node script/analyze-variants.mjs --keys 20                       # 同键多译（含长句）
node script/analyze-variants.mjs --scan 20                       # 短键多译扫描
```

四个视角：

- **词级**：从 ≤3 个英文词的短键译文里取前缀/后缀 n-gram 当候选，统计它在整个词组里的覆盖率与「提升度」（相对全库频率）。这样「邮箱 / 电子邮件」会浮出来，「子邮」这类跨词碎片会被包含关系过滤掉。
- **模板**：按英文前缀取键，统计译文前缀/后缀分布。例如 `Learn more about` → 前缀「了解更多关于」86%、后缀「的信息」52%，另有 7 处写成「了解有关…的更多信息」。
- **同键**：同一个英文键在不同段落被译成不同的值，长句也能抓出来（复制粘贴后改了半句的情况）。
- **短键扫描**：≤3 个英文词的标签类键，按分歧程度排序，适合定期体检。

输出是**候选表，不是裁决**。工具没有中文分词，仍会混入「电子邮」「通过」这类片段；覆盖率高也不等于译法正确。

## 局限（已知，不打算用工具解决）

- 只覆盖 `locals.js`；`main.user.js` 里硬编码的界面文案暂未纳入。
- 不校验 `locals_zh-TW.js`：它由 opencc + `t2s_rules.conf` 生成，术语归属那边。
- 被 spread/别名合并的段落无法表达多语境译法，只能统一或拆段（见上）。
- 报告里的「行号近似」来自 `...I18N["zh-CN"]["x"]["static"]` 展开运算符：词条内容其实写在被展开的段落里。
- 不做自动改写：中文替换会改坏语义（「问题」≠「议题」），机器只守门，裁决留在表里。
