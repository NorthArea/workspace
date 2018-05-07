# workspace
npm workspace with gulp

```bash
  npm install
  npm install -g gulp-cli
```
./source - folder for source.


```bash
  gulp start
```
or

```bash
  gulp watch
```
```
Tasks for gulpfile.js
├── clean - remove ./build
├─┬ start - 
│ └─┬ <parallel>
│   ├─┬ <series>
│   │ ├─┬ <parallel>
│   │ │ ├── copyMyImg - [copy] img from ./source/img/
│   │ │ └── copyFrameworkImg - [copy] img from ./source/framework/img/
│   │ └─┬ <parallel>
│   │   ├── compressMyImg - [compress] img from ./source/img/
│   │   └── compressFrameworkImg  - [compress] img from ./source/framework/img/
│   ├── copyMyHtml - [copy] html from ./source/*.html
│   ├── myPug - [rendering] html from ./source/scss/*.pug
│   ├── myScript - [render] JS from ./source/js/**/*.js
│   ├── myStyle - [render] SCSS from ./source/scss/*.scss
│   ├── frameworkScript - [copy, concat] js from ./source/framework/js/**/*.js
│   └── frameworkStyle - [copy, concat, PostCSS:'cssnano'] css from ./source/framework/css/**/*.css
└─┬ watch
  └─┬ <series>
    ├─┬ start
    │ └─┬ <parallel>
    │   ├─┬ <series>
    │   │ ├─┬ <parallel>
    │   │ │ ├── copyMyImg
    │   │ │ └── copyFrameworkImg
    │   │ └─┬ <parallel>
    │   │   ├── compressMyImg
    │   │   └── compressFrameworkImg
    │   ├── copyMyHtml
    │   ├── myPug
    │   ├── myScript
    │   ├── myStyle
    │   ├── frameworkScript
    │   └── frameworkStyle
    └─┬ <parallel>
      ├── watchMyImg [watch] img from ./source/img/
      ├── watchFrameworkImg [watch] img from ./source/framework/img/*
      ├── watchMyHtml [watch] ./source/*.html
      ├── watchMyPug [watch] ./source/*.pug
      ├── watchMyScript [watch] ./source/js/**/.js
      ├── watchMyStyle [watch] ./source/scss/.scss
      ├── watchFrameworkScript [watch] ./source/framework/js/**/.js
      └── watchFrameworkStyle [watch] ./source/framework/css/**/.css
```