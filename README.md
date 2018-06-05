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

#### Input:
PUG,HTML,JS,CSS,SCSS,JPEG,PNG...

#### Output:
framework.css  
framework.js  
styles.css, styles.uncompress.css, styles.css.map  
main.js, main.uncompress.js, main.js.map  
combine.css  
combine.js  
### tree workspace folder
```
workspace
├── README.md
├── gulpfile.js
├── package.json
└── workspace - work folder
    ├── build      - output
    │   ├── css
    │   ├── img
    │   └── js
    └── source("/*.pug","/*.html")     - input
        ├── custom
        │   ├── img("/**/*")
        │   ├── js("/*.js")
        │   └── scss("/*.scss")
        └── framework - folder for framework (bootstrap or bulma or other css/js framework)
            ├── css("/*.css")
            ├── img("/**/*")
            └── js("/*.js")
```

```bash
  // Remove ./build
  npm run clean
  // Start workspace
  npm run start
  // Start workspace with watch
  npm run watch
  // Build workspace
  npm run build
  // --tasks
  npm run gulp
  
  npm install -g gulp-cli
  gulp clean
  gulp start
  gulp watch
  gulp build
  gulp --tasks
```

### gulp --tasks:
```
Tasks for ~/workspace/workspace/gulpfile.js
├── clean
├── cleanAll
├─┬ start
│ └─┬ <series>
│   ├── clean
│   └─┬ <parallel>
│     ├─┬ <series>
│     │ ├─┬ <parallel>
│     │ │ ├── copyCustomImg
│     │ │ └── copyFrameworkImg
│     │ └─┬ <parallel>
│     │   ├── compressCustomImg
│     │   └── compressFrameworkImg
│     ├── copyCustomHtml
│     ├── renderCustomPug
│     ├── bundleCustomScript
│     ├── bundleCustomStyles
│     ├── bundleFrameworkScript
│     └── bundleFrameworkStyles
├─┬ watch
│ └─┬ <series>
│   ├─┬ start
│   │ └─┬ <series>
│   │   ├── clean
│   │   └─┬ <parallel>
│   │     ├─┬ <series>
│   │     │ ├─┬ <parallel>
│   │     │ │ ├── copyCustomImg
│   │     │ │ └── copyFrameworkImg
│   │     │ └─┬ <parallel>
│   │     │   ├── compressCustomImg
│   │     │   └── compressFrameworkImg
│   │     ├── copyCustomHtml
│   │     ├── renderCustomPug
│   │     ├── bundleCustomScript
│   │     ├── bundleCustomStyles
│   │     ├── bundleFrameworkScript
│   │     └── bundleFrameworkStyles
│   └─┬ <parallel>
│     ├── watchCustomImg
│     ├── watchFrameworkImg
│     ├── watchCustomHtml
│     ├── watchCustomPug
│     ├── watchCustomScript
│     ├── watchCustomStyles
│     ├── watchFrameworkScript
│     └── watchFrameworkStyles
└─┬ build
  └─┬ <series>
    ├── clean
    ├─┬ <parallel>
    │ ├─┬ <series>
    │ │ ├─┬ <parallel>
    │ │ │ ├── copyCustomImg
    │ │ │ └── copyFrameworkImg
    │ │ └─┬ <parallel>
    │ │   ├── compressCustomImg
    │ │   └── compressFrameworkImg
    │ └─┬ <parallel>
    │   ├── copyCustomHtml
    │   ├── renderCustomPug
    │   ├── buildBundleCustomStyles_uncompress
    │   ├── buildBundleCustomStyles_compress
    │   ├── buildBundleCustomScript_uncompress
    │   ├── buildBundleCustomScript_compress
    │   ├── bundleFrameworkScript
    │   └── bundleFrameworkStyles
    └─┬ <parallel>
      ├── combineStyles
      └── combineScript
```