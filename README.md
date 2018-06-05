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
├── workspace/ - work folder
│  ├── build/      - output
│  │   └── assets
│  │       └── css
│  │       └── img
│  │       └── js
│  source/     - input
│  ├── framework - folder for your code or framework (bootstrap or bulma or other css/js framework)
│  │   ├── css("/**/*.css")
│  │   ├── img("/**/*")
│  │   └── js("/**/*.js")
│  └── custom("/*.pug","/*.html")
│      ├── img("/**/*")
│      ├── js("/**/*.js")
│      └── scss("/*.scss")
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
│     ├── bundleCustomStyle
│     ├── bundleFrameworkScript
│     └── bundleFrameworkStyle
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
│   │     ├── bundleCustomStyle
│   │     ├── bundleFrameworkScript
│   │     └── bundleFrameworkStyle
│   └─┬ <parallel>
│     ├── watchCustomImg
│     ├── watchFrameworkImg
│     ├── watchCustomHtml
│     ├── watchCustomPug
│     ├── watchCustomScript
│     ├── watchCustomStyle
│     ├── watchFrameworkScript
│     └── watchFrameworkStyle
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
    │   ├── buildBundleCustomStyle_uncompress
    │   ├── buildBundleCustomStyle_compress
    │   ├── buildBundleCustomScript_uncompress
    │   ├── buildBundleCustomScript_compress
    │   ├── bundleFrameworkScript
    │   └── bundleFrameworkStyle
    └─┬ <parallel>
      ├── combineStyle
      └── combineScript
```