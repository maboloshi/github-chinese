# GitHub 汉化插件

> 给像我这样英文渣渣同学的福利。

  [![GitHub issues][issues-image]][issues-url]
  [![GitHub stars][stars-image]][stars-url]
  [![GitHub forks][forks-image]][forks-url]
  [![license MIT][license-image]][license-url]


> **2017-03-19 GitHub 更新，导致之前版本无法正常使用，请大家及时升级。**
> **2016-04-18 GitHub 更新，导致之前版本无法正常使用，请大家及时升级。**


## 特性 (Features)

1. 给像我这样英文渣渣同学的福利。
2. 很多新手朋友不太会玩 GitHub，主要是全英文看的头晕眼花。
3. 熟悉后关掉插件恢复英文模式，依然闭着眼睛都知道功能在哪。


## 安装

1. 请先安装 [Tampermonkey][1] 插件，支持 Chrome, Opera Next 和 Safari 浏览器。
2. 然后再点击这个链接 [GitHub 汉化插件][2] 安装脚本即可。
3. 刷新下页面，即可发现网站已汉化。

> 目前仅支持 [Tampermonkey][1] 插件
>
> 很多人打不开谷歌插件中心，我已经下载好放在了根目录下方便大家使用。  
> 点击这里 [Tampermonkey_v4.2.7.crx][Tampermonkey] 分流下载插件。


**PS: 最近 Tampermonkey 更新较大，可能无法打开插件地址，所以可以尝试如下方法手动安装脚本**  

1. 下载 [Tampermonkey_v4.2.7.crx][Tampermonkey] 插件
2. 在 chrome 里打开 chrome://extensions/ 这里地址
3. 把刚才下载到的 Tampermonkey_v4.2.7.crx 拖进去就好了
4. 接着点浏览器右上角的插件图标，选择 “添加新脚本...”
5. 然后将 https://github.com/52cik/github-hans/blob/gh-pages/main.js 源码复制进去
6. 最后保存即可


## 待办 (TODO)

1. 添加 GitHub 名词解释，新手可能不太理解部分名词具体表达的意思，比如 `pull request`。
2. 整理部分 git&github 学习资料, 帮助新手**更快**上手 git&github。
3. **本人英文渣渣，翻译非常困难，急需大家 pr 共同翻译**


## 相关概念及资料文档

> ps: 由于本插件是之前心血来潮搞出来的，一开始没有参照相关资料，所以有些词汇可能有点差异，今后的翻译和修复都会遵循以下文档。

1. [Pro Git 第二版 简体中文](https://www.gitbook.com/book/bingohuang/progit2/details)
2. [Pro Git: 翻译约定](https://github.com/progit/progit2-zh/blob/master/TRANSLATION_NOTES.asc)
3. [Git官方软件包的简体中文翻译](https://github.com/git/git/blob/master/po/zh_CN.po)

## 插件设置为每日更新，因为翻译的比较频繁

  ![everyday][everyday]


## 预览

  ![预览][png-1]
  ![预览][png-2]
  ![预览][png-3]
  ![预览][png-4]
  ![github-hans][github-hans]


[1]: http://tampermonkey.net/ "Tampermonkey"
[2]: https://openuserjs.org/install/52cik/GitHub_%E6%B1%89%E5%8C%96%E6%8F%92%E4%BB%B6.user.js "GitHub 汉化插件"

[png-1]: https://raw.githubusercontent.com/52cik/github-hans/gh-pages/preview/1.png
[png-2]: https://raw.githubusercontent.com/52cik/github-hans/gh-pages/preview/2.png
[png-3]: https://raw.githubusercontent.com/52cik/github-hans/gh-pages/preview/3.png
[png-4]: https://raw.githubusercontent.com/52cik/github-hans/gh-pages/preview/4.png
[everyday]: https://raw.githubusercontent.com/52cik/github-hans/gh-pages/preview/everyday.png
[github-hans]: https://raw.githubusercontent.com/52cik/github-hans/gh-pages/preview/github-hans.gif "github-hans"

[Tampermonkey]: http://www.52cik.com/github-hans/Tampermonkey_v4.2.7.crx "Tampermonkey"


[issues-url]: https://github.com/52cik/github-hans/issues
[issues-image]: https://img.shields.io/github/issues/52cik/github-hans.svg

[stars-url]: https://github.com/52cik/github-hans/stargazers
[stars-image]: https://img.shields.io/github/stars/52cik/github-hans.svg

[forks-url]: https://github.com/52cik/github-hans/network
[forks-image]: https://img.shields.io/github/forks/52cik/github-hans.svg

[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
