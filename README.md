# Workspace

Run "npm install" to install Node.js dependencies.  
Run "npm install -s gulp@next" to install gulp 4.

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
PUG template and partials.
styles.css - combine and minify.
main.js - combine and uglify.

### tree workspace folder
```
workspace
├── LICENSE
├── README.md
├── gulpfile.js
├── package.json
└── workspace - work folder
    ├── build - output
    │   ├── css
    │   ├── img
    │   └── js
    └── source("/*.pug","/*.html")     - input
        ├── img("/**/*")
        ├── js("/*.js")
        │   ├── framework("/*.js")
        │   └── jquery("/*.js")
        ├── style
        │   ├── framework("/*.css")
        │   └── scss("/*.scss")
        └── template
            └── partials
```

```bash
  ##Remove build folder
  npm run clean
  ##Remove build and other folder
  npm run cleanAll
  ## Start workspace
  npm run start
  ## Start workspace to 'watch'
  npm run watch
  ## Build - distr.
  npm run build
  ## list of gulp tasks
  npm run gulp
  
  ## npm install -g gulp-cli
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
│     │ │ └── copyImg
│     │ └─┬ <parallel>
│     │   └── compressImg
│     ├── copyHtml
│     ├── renderPug
│     ├── bundleScript
│     └── bundleStyle
├─┬ watch
│ └─┬ <series>
│   ├─┬ start
│   │ └─┬ <series>
│   │   ├── clean
│   │   └─┬ <parallel>
│   │     ├─┬ <series>
│   │     │ ├─┬ <parallel>
│   │     │ │ └── copyImg
│   │     │ └─┬ <parallel>
│   │     │   └── compressImg
│   │     ├── copyHtml
│   │     ├── renderPug
│   │     ├── bundleScript
│   │     └── bundleStyle
│   └─┬ <parallel>
│     ├── watchImg
│     ├── watchHtml
│     ├── watchPug
│     ├── watchScript
│     └── watchStyle
└─┬ build
  └─┬ <series>
    ├── clean
    └─┬ <parallel>
      ├─┬ <series>
      │ ├─┬ <parallel>
      │ │ └── copyImg
      │ └─┬ <parallel>
      │   └── compressImg
      ├── copyHtml
      ├── renderPug
      ├─┬ <series>
      │ ├── buildStyle_compress
      │ └── buildStyle_concat
      ├── buildScript_uncompress
      └── buildScript_compress
```