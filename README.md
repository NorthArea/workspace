# Workspace

### In "workspace" folder:
```bash
  npm install
```
### Incude(Dependencies):
del  
cssnano  
autoprefixer  
gulp@next  
gulp-imagemin  
gulp-pug  
gulp-sass  
gulp-postcss  
gulp-concat  
gulp-uglify  
gulp-rename  

### tree workspace folder
```
workspace/
├── README.md
├── build/      - outpute
│   └── assets
│       └── css
│       └── img
│       └── js
├── gulpfile.js   - config and fuctions
├── package.json
└── source/     - input
    ├── framework - folder for your code or framework (like bootstrap)
    │   ├── css("/**/*.css")
    │   ├── img("/**/*")
    │   └── js("/**/*.js")
    └── workspace("/*.pug","/*.html") - your workspace
        ├── img("/**/*")
        ├── js("/**/*.js")
        └── scss("/*.scss")
```

### You can use npm or install globaly gulp-cli

```bash
  // Remove ./build
  npm clean
  // Start workspace
  npm start
  // Start workspace with watch
  npm watch
  // Build workspace
  npm build
  // --tasks
  npm gulp
  
  npm install -g gulp-cli
  gulp clean
  gulp start
  gulp watch
  gulp build
  gulp --tasks
```

### gulp --tasks:
```
Tasks for gulpfile.js
├── clean - remove ./build
├─┬ start - start workspace
│ └─┬ <parallel>
│   ├─┬ <series>
│   │ ├─┬ <parallel>
│   │ │ ├── copyWsImg - [copy] img from ./source/img/
│   │ │ └── copyFrameworkImg - [copy] img from ./source/framework/img/
│   │ └─┬ <parallel>
│   │   ├── compressWsImg - [compress] img from ./source/img/
│   │   └── compressFrameworkImg  - [compress] img from ./source/framework/img/
│   ├── copyWsHtml - [copy] html from ./source/*.html
│   ├── wsPug - [rendering] html from ./source/scss/*.pug
│   ├── wsScript - [render] JS from ./source/js/**/*.js
│   ├── wsStyle - [render] SCSS from ./source/scss/*.scss
│   ├── frameworkScript - [copy, concat] js from ./source/framework/js/**/*.js
│   └── frameworkStyle - [copy, concat, PostCSS:'cssnano'] css from ./source/framework/css/**/*.css
├─┬ watch
│ └─┬ <series>
│   ├─┬ start
│   │ └─┬ <series>
│   │   ├── clean
│   │   └─┬ <parallel>
│   │     ├─┬ <series>
│   │     │ ├─┬ <parallel>
│   │     │ │ ├── copyWsImg
│   │     │ │ └── copyFrameworkImg
│   │     │ └─┬ <parallel>
│   │     │   ├── compressWsImg
│   │     │   └── compressFrameworkImg
│   │     ├── copyWsHtml
│   │     ├── wsPug
│   │     ├── wsScript
│   │     ├── wsStyle
│   │     ├── frameworkScript
│   │     └── frameworkStyle
│   └─┬ <parallel>
│     ├── watchWsImg [watch] img from ./source/img/
│     ├── watchFrameworkImg [watch] img from ./source/framework/img/*
│     ├── watchWsHtml [watch] ./source/*.html
│     ├── watchWsPug [watch] ./source/*.pug
│     ├── watchWsScript [watch] ./source/js/**/.js
│     ├── watchWsStyle [watch] ./source/scss/.scss
│     ├── watchFrameworkScript [watch] ./source/framework/js/**/.js
│     └── watchFrameworkStyle [watch] ./source/framework/css/**/.css
└─┬ build
  └─┬ <series>
    ├── clean
    ├─┬ <series>
    │ ├─┬ <parallel>
    │ │ ├── copyWsImg
    │ │ └── copyFrameworkImg
    │ └─┬ <parallel>
    │   ├── compressWsImg
    │   └── compressFrameworkImg
    └─┬ <parallel>
      ├── copyWsHtml
      ├── wsPug
      ├── wsScriptBuild_uncompress
      ├── wsScriptBuild_compress
      ├── wsStyleBuild_uncompress
      ├── wsStyleBuild_compress
      ├── frameworkScript
      └── frameworkStyle
```