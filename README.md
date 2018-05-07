# Workspace

### In "workspace" folder:
```bash
  npm install
```
### Incude(Dependencies):
del  
gulp@next  
gulp-concat  
gulp-rename  
gulp-pug  
gulp-imagemin  
autoprefixer  
cssnano  
gulp-postcss  
gulp-sass  
gulp-uglify  

### tree workspace folder
```
workspace/
├── README.md
├── build/      - outpute
│   └── assets
│       └── css
│       └── img
│       └── js
├── gulpfile.js
├── package.json
└── source/     - input
    ├── framework - folder for your code or framework (bootstrap)
    │   ├── css
    │   ├── img
    │   └── js
    └── workspace - your workspace
        ├── img
        ├── js
        └── scss
```

### You can use npm or install gulp-cli

```bash
  // Remove ./build
  npm clean
  // Start workspace
  npm start
  // Start workspace with watch
  npm watch
  // Build workspace
  npm build
  // 
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
└─┬ watch
  └─┬ <series>
    ├─┬ start
    │ └─┬ <parallel>
    │   ├─┬ <series>
    │   │ ├─┬ <parallel>
    │   │ │ ├── copyWsImg
    │   │ │ └── copyFrameworkImg
    │   │ └─┬ <parallel>
    │   │   ├── compressWsImg
    │   │   └── compressFrameworkImg
    │   ├── copyWsHtml
    │   ├── wsPug
    │   ├── wsScript
    │   ├── wsStyle
    │   ├── frameworkScript
    │   └── frameworkStyle
    └─┬ <parallel>
      ├── watchWsImg [watch] img from ./source/img/
      ├── watchFrameworkImg [watch] img from ./source/framework/img/*
      ├── watchWsHtml [watch] ./source/*.html
      ├── watchWsPug [watch] ./source/*.pug
      ├── watchWsScript [watch] ./source/js/**/.js
      ├── watchWsStyle [watch] ./source/scss/.scss
      ├── watchFrameworkScript [watch] ./source/framework/js/**/.js
      └── watchFrameworkStyle [watch] ./source/framework/css/**/.css
```