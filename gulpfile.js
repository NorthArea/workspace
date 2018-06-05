/*Gulp*/
// Automation
const gulp = require("gulp")
// Pipes streams together and destroys all of them if one of them closes.

/*File*/
// Delete file
const del = require('del')
// Rename file rename({ extname: '.min.js' })
const rename = require("gulp-rename")
// Compress PNG, JPEG, GIF and SVG images
const imagemin = require('gulp-imagemin')

/*HTML*/
// Compile PUG to HTML
const pug = require('gulp-pug')

/*CSS*/
// Compile SASS to css
const sass = require('gulp-sass')
// PostCSS
const postcss = require('gulp-postcss')
// Add autoprefix
const autoprefixer = require('autoprefixer')
// Compress and optimize CSS
const cssnano = require('cssnano')

/*JS*/
// Concatenate JS
const concat = require('gulp-concat')
// Compress JS
const uglify = require("gulp-uglify")
// Create map for JS
const sourcemaps = require('gulp-sourcemaps')


//Variables
const custom = {
  styles: {
    src: 'workspace/source/custom/scss/*.scss',
    dest: 'workspace/build/css/'
  },
  scripts: {
    src: 'workspace/source/custom/js/*.js',
    dest: 'workspace/build/js/'
  },
  img: {
    src: 'workspace/source/custom/img/**/*',
    dest: 'workspace/build/img/'
  },
  html: {
    src: 'workspace/source/custom/*.html',
    dest: 'workspace/build/'
  },
  pug: {
    src: 'workspace/source/custom/*.pug',
    dest: 'workspace/build/'
  }
}

const framework = {
  styles: {
    src: 'workspace/source/framework/css/**/*.css',
    dest: 'workspace/build/css/'
  },
  scripts: {
    src: 'workspace/source/framework/js/**/*.js',
    dest: 'workspace/build/js/'
  },
  img: {
    src: 'workspace/source/framework/img/**/*',
    dest: 'workspace/build/img/'
  }
}

const combine = {
  styles: {
    src: 'workspace/build/css/style.css',
    dest: 'workspace/build/css/'
  },
  scripts: {
    src: ['workspace/build/js/main.js', 'workspace/build/js/framework.js'],
    dest: 'workspace/build/js/'
  }
}

//Functions

// File
//Remove build folder
function clean() {
  return del(['./workspace/build'])
}

function cleanAll() {
  del(['./workspace/build'])
  del([framework.styles.src])
  del([framework.scripts.src])
  del([framework.img.src])
  del([custom.styles.src])
  del([custom.scripts.src])
  del([custom.img.src])
  del([custom.html.src])
  del([custom.pug.src])
  return del(['./workspace/source/custom/scss/*'])
}

// Copy img
function copyCustomImg() {
  return gulp.src(custom.img.src)
    .pipe(gulp.dest(custom.img.dest))
}

function copyFrameworkImg() {
  return gulp.src(framework.img.src)
    .pipe(gulp.dest(framework.img.dest))
}

// Compress PNG, JPEG, GIF, SVG and copy them in /dev/img/ and replace copyImg()
function compressCustomImg() {
  return gulp.src(custom.img.src)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(custom.img.dest))
}

function compressFrameworkImg() {
  return gulp.src(framework.img.src)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(framework.img.dest))
}

// Watch Img
function watchCustomImg() {
  gulp.watch(custom.img.src, gulp.series(copyCustomImg, compressCustomImg))
}

function watchFrameworkImg() {
  gulp.watch(framework.img.src, gulp.series(copyFrameworkImg, compressFrameworkImg))
}


// PUG & HTML
// Copy HTML  from ./source to ./test
function copyCustomHtml() {
  return gulp.src(custom.html.src)
    .pipe(gulp.dest(custom.html.dest))
}

// Compile PUG to HTML
function renderCustomPug() {
  return gulp.src(custom.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(custom.pug.dest))
}

// Watch
function watchCustomHtml() {
  gulp.watch(custom.html.src, copyCustomHtml)
}

function watchCustomPug() {
  gulp.watch(custom.pug.src, renderCustomPug)
}


//JS, CSS, SASS
// "Custom" JS
function bundleCustomScript() {
  return gulp.src(custom.scripts.src, { sourcemaps: false })
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(custom.scripts.dest))
}

// "Custom" SASS
function bundleCustomStyle() {
  return gulp.src(custom.styles.src, { sourcemaps: false })
    .pipe(concat('style.css'))
    .pipe(sass())
    .pipe(sourcemaps.write('.', { sourceRoot: 'css-source' }))
    .pipe(gulp.dest(custom.styles.dest))
}

// "Framework" JS
function bundleFrameworkScript() {
  return gulp.src(framework.scripts.src, { sourcemaps: false })
    .pipe(concat('framework.js'))
    .pipe(gulp.dest(framework.scripts.dest))
}

// "Framework" CSS
function bundleFrameworkStyle() {
  return gulp.src(framework.styles.src, { sourcemaps: false })
    .pipe(concat('framework.css'))
    .pipe(gulp.dest(framework.styles.dest))
}

// Watch "Сustom" JS
function watchCustomScript() {
  gulp.watch(custom.scripts.src, bundleCustomScript)
}

// Watch "Сustom" SASS
function watchCustomStyle() {
  gulp.watch(custom.styles.src, bundleCustomStyle)
}

// Watch Framework JS
function watchFrameworkScript() {
  gulp.watch(framework.scripts.src, bundleFrameworkScript)
}

// Watch Framework CSS
function watchFrameworkStyle() {
  gulp.watch(framework.styles.src, bundleFrameworkStyle)
}

// Compress & uncompress "custom" style
function buildBundleCustomStyle_uncompress() {
  return gulp.src(custom.styles.src, { sourcemaps: false })
    .pipe(concat('style.uncompress.css'))
    .pipe(sass())
    .pipe(gulp.dest(custom.styles.dest))
}

function buildBundleCustomStyle_compress() {
  var plugins = [
    autoprefixer({ brocustomers: ['last 8 version'] }),
    cssnano(),
  ]
  return gulp.src(custom.styles.src, { sourcemaps: true })
    .pipe(concat('style.css'))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.', { sourceRoot: 'css-source' }))
    .pipe(gulp.dest(custom.styles.dest))
}

// Compress & uncompress "custom" script
function buildBundleCustomScript_uncompress() {
  return gulp.src(custom.scripts.src, { sourcemaps: false })
    .pipe(concat('main.uncompress.js'))
    .pipe(gulp.dest(custom.scripts.dest))
}

function buildBundleCustomScript_compress() {
  return gulp.src(custom.scripts.src, { sourcemaps: true })
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(custom.scripts.dest))
}

function combineStyle() {
  return gulp.src(combine.styles.src, { sourcemaps: false })
    .pipe(concat('combine.css'))
    .pipe(gulp.dest(combine.styles.dest))
}

function combineScript() {
  return gulp.src(combine.scripts.src, { sourcemaps: false })
    .pipe(concat('combine.js'))
    .pipe(gulp.dest(combine.scripts.dest))
}

// Tasks
gulp.task('clean', clean)
gulp.task('cleanAll', cleanAll)

gulp.task('start', gulp.series(
  clean,
  gulp.parallel(
    gulp.series(
      gulp.parallel(copyCustomImg, copyFrameworkImg),
      gulp.parallel(compressCustomImg, compressFrameworkImg)
    ),
    copyCustomHtml,
    renderCustomPug,
    bundleCustomScript,
    bundleCustomStyle,
    bundleFrameworkScript,
    bundleFrameworkStyle
  )
))

gulp.task('watch', gulp.series(
  'start',
  gulp.parallel(
    watchCustomImg,
    watchFrameworkImg,
    watchCustomHtml,
    watchCustomPug,
    watchCustomScript,
    watchCustomStyle,
    watchFrameworkScript,
    watchFrameworkStyle
  )
))

gulp.task('build', gulp.series(
  clean,
  gulp.parallel(
    gulp.series(
      gulp.parallel(copyCustomImg, copyFrameworkImg),
      gulp.parallel(compressCustomImg, compressFrameworkImg)
    ),
    gulp.parallel(
      copyCustomHtml,
      renderCustomPug,
      buildBundleCustomStyle_uncompress,
      buildBundleCustomStyle_compress,
      buildBundleCustomScript_uncompress,
      buildBundleCustomScript_compress,
      bundleFrameworkScript,
      bundleFrameworkStyle
    )
  ),
  gulp.parallel(
    combineStyle,
    combineScript
  )
))
