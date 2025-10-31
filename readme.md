# Method Draw

Method Draw is a web based vector drawing application. The purpose of Method Draw is to provide a simple and easy-to-use SVG editor experience. It purposely removes some features such as layers and line-caps/corners in exchange for a more simple and pleasant experience. If you are looking for a more complete vector editing open-source solution, please check out [SVG Edit](https://github.com/SVG-Edit/svgedit).

#### [Try Method Draw](https://editor.method.ac) online.

![Method Draw](https://method.ac/img/method-draw2021.png)

## Development

Develop and run a local web server under `src`;

```
cd src
python -m SimpleHTTPServer 8000
```

or if you have Python 3:

```
cd src
python -m http.server 8000
```

## Build

Install dev dependencies:

`npm install`

Then you can build into `dist` by running:

`gulp build`

Deploy `dist` to your static file server of choice.

## Release notes

**2021.05.26** Minor redesign
**2021.05.12** Solved stability issues
**2021.02.15** Major code refactor  
**2021.01.15** Added new fonts  
**2021.01.01** Text handling improvements  
**2020.12.10** Gradient fixes on Windows and Safari MacOS  
**2020.08.04** Vast code simplification  
**2020.08.02** File clean-up and gulp build implemented  
**2020.08.01** Project thawed  
**2015.01.01** Project frozen  
**2013.01.01** Project forked from SVG-Edit

Sponsor development by [donating to the author](https://method.ac/donate/).

Method Draw is Copyright (c)
Mark MacKay [mark@method.ac](mailto:mark@method.ac)

Published under an MIT License. Enjoy.

---

# Method Draw（繁體中文）

Method Draw 是一個基於網路的向量繪圖應用程式。Method Draw 的目的是提供簡單易用的 SVG 編輯體驗。它刻意移除了一些功能，例如圖層和線端樣式，以換取更簡潔的使用體驗。如果您需要功能更完整的向量編輯開源解決方案，請查看 [SVG Edit](https://github.com/SVG-Edit/svgedit)。

#### [在線上試用 Method Draw](https://editor.method.ac)

![Method Draw](https://method.ac/img/method-draw2021.png)

## 開發

在 `src` 目錄下運行本地網頁伺服器：

```bash
cd src
python -m SimpleHTTPServer 8000
```

或如果您使用 Python 3：

```bash
cd src
python -m http.server 8000
```

## 建置

安裝開發依賴：

`npm install`

然後您可以執行以下命令建置到 `dist` 目錄：

`gulp build`

將 `dist` 部署到您選擇的靜態檔案伺服器。

## 台灣版本說明

這是一個針對台灣使用者的 Method Draw 專案分支，專注於交通相關的向量圖形編輯需求。本專案由台灣公司 It-smart（智晟）正式採用並維護，我們致力於提供更好的繁體中文支援和使用體驗。
