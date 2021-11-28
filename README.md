# [GitHub 中文化插件][project-url]
> 本项目源自: [52cik/github-hans](https://github.com/52cik/github-hans)

  [![GitHub issues][issues-image]][issues-url]
  [![GitHub stars][stars-image]][stars-url]
  [![GitHub forks][forks-image]][forks-url]
  [![license GPL-3.0][license-image]][license-url]
  [![GreasyFork installs][greasyFork-image]][greasyFork-url]

## 功能
- 中文化 GitHub 菜单栏，标题，按钮等公共组件
- 保留、完善正则功能
- 除基础组件中文化外，还支持对 “项目描述” 进行人机翻译 (参考: [k1995/github-i18n-plugin](https://github.com/k1995/github-i18n-plugin))

## 安装
1. 请先安装用户脚本管理器如: [Tampermonkey][Tampermonkey], [violentmonkey][violentmonkey] 等，支持的浏览器：Chrome, Microsoft Edge, Safari, Opera Next, 和 Firefox。
2. 然后再点击链接之一，安装脚本即可。
  -  [GitHub 中文化插件 - github 托管][main.user.js] 
  -  [GitHub 中文化插件 - greasyfork 托管][main(greasyfork).user.js] 
3. 刷新下页面，即可发现网站已中文化。

> 测试平台: Win10 + Chrome + Tampermonkey, violentmonkey

## 更新说明:

#### 2021-11-23 10:51:22
更新许可证为 [GPL-3.0][license-url] 希望大家依据许可证使用

#### 2021-10-31 21:49:00
正式发布 1.7.0 版本

#### 2021-10-07 13:16:16

原作者[楼教主](https://github.com/52cik/github-hans)已停止维护多年，且近年来 GitHub 页面结构的变化，导致原有的脚本无法正常工作。

虽然 GitHub 在被微软售收购比较重视国际化，启动并基本完成了GitHub 文档的中文化。但是，关于 GitHub 页面的中文化暂时还没启动。

对于，新手使用和高阶使用仍会存在一定的障碍。故，本人依据个人兴趣暂时进行了一定的修复和维护。

本次维护基本恢复和保留大部分功能如：页面正则翻译（含日期的正则）。页面词条可能被我切得太碎不方便后期维护（先这样吧！）

## 待办 (TODO)

1. 添加 GitHub 名词解释，新手可能不太理解部分名词具体表达的意思，比如 `pull request`。
2. 整理部分 git & [GitHub](https://github.com/) 学习资料, 帮助新手**更快**上手。
3. **本人英文渣渣，翻译非常困难，急需大家 pr 共同翻译**

## 贡献

目前，已翻译大部分常用页面，欢迎补充完善，中文词条在`locals.js`中。大家在补充完善的过程，请遵循以下文档对相关术语进行翻译：

相关概念及资料文档:

1. [Pro Git 第二版 简体中文](https://www.gitbook.com/book/bingohuang/progit2/details)
2. [Pro Git: 翻译约定](https://github.com/progit/progit2-zh/blob/master/TRANSLATION_NOTES.asc)
3. [Git官方软件包的简体中文翻译](https://github.com/git/git/blob/master/po/zh_CN.po)
4. [GitHub 词汇表官方译本](https://docs.github.com/cn/get-started/quickstart/github-glossary)

## 插件设置建议为每日更新，因为翻译更新可能比较频繁

  ![Tampermonkey-everyday][everyday-1]
  ![violentmonkey-everyday][everyday-2]

## 预览

  ![预览][png-1]
  ![预览][png-2]
  ![预览][png-3]
  ![预览][png-4]
  ![github-chinese][github-chinese]

[project-url]: https://github.com/maboloshi/github-chinese "GitHub 中文化插件"

[issues-url]: https://github.com/maboloshi/github-chinese/issues "议题"
[issues-image]: https://img.shields.io/github/issues/maboloshi/github-chinese?style=flat-square&logo=github&label=Issue

[stars-url]: https://github.com/maboloshi/github-chinese/stargazers "星标"
[stars-image]: https://img.shields.io/github/stars/maboloshi/github-chinese?style=flat-square&logo=github&label=Star

[forks-url]: https://github.com/maboloshi/github-chinese/network "复刻"
[forks-image]: https://img.shields.io/github/forks/maboloshi/github-chinese?style=flat-square&logo=github&label=Fork

[license-url]: https://opensource.org/licenses/GPL-3.0  "许可证"
[license-image]: https://img.shields.io/github/license/maboloshi/github-chinese?style=flat-square&logo=github&label=License

[greasyFork-url]: https://greasyfork.org/scripts/435208  "GreasyFork - GitHub 中文化插件"
[greasyFork-image]: https://img.shields.io/badge/dynamic/json?style=flat-square&label=GreasyFork&query=total_installs&suffix=%20installs&url=https://greasyfork.org/scripts/435208.json

[Tampermonkey]: http://tampermonkey.net/ "Tampermonkey"
[violentmonkey]: https://violentmonkey.github.io/ "暴力猴"

[main.user.js]: https://maboloshi.github.io/github-chinese/main.user.js "GitHub 中文化插件 - GitHub 托管"
[main(greasyfork).user.js]: https://greasyfork.org/scripts/435208-github-%E4%B8%AD%E6%96%87%E5%8C%96%E6%8F%92%E4%BB%B6/code/GitHub%20%E4%B8%AD%E6%96%87%E5%8C%96%E6%8F%92%E4%BB%B6.user.js "GitHub 中文化插件 - GreasyFork 托管"

[png-1]: https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/1.png
[png-2]: https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/2.png
[png-3]: https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/3.png
[png-4]: https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/4.png
[everyday-1]: https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/everyday-1.png
[everyday-2]: https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/everyday-2.png
[github-chinese]: https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/github-chinese.webp
