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
const path = {
  style: {
    src: ['./workspace/source/style/framework/*.css','./workspace/source/style/scss/*.scss'],
    dest: './workspace/build/css/'
  },
  cache: {
    src: ['./workspace/source/style/scss/.sass-cache/css/','./workspace/source/style/scss/.sass-cache/','./workspace/source/style/scss/**/*'],
    css: './workspace/source/style/scss/.sass-cache/css/style.css'
  },
  scripts: {
    src: ['./workspace/source/js/jquery/*.js','./workspace/source/js/framework/*.js','./workspace/source/js/*.js'],
    dest: './workspace/build/js/'
  },
  img: {
    src: './workspace/source/img/**/*',
    dest: './workspace/build/img/'
  },
  html: {
    src: ['./workspace/source/template/*.html','./workspace/source/template/partials/**/*'],
    dest: './workspace/build/'
  },
  pug: {
    src: ['./workspace/source/template/*.pug','./workspace/source/template/partials/**/*'],
    dest: './workspace/build/'
  }
}

//Functions

// Clean
//Remove build folder
function clean() {
  return del(['./workspace/build'])
}

// CleanAll
function cleanAll() {
  return del(['./workspace/build',path.cache.src[0],path.cache.src[1],path.cache.src[2],path.style.src[0],path.style.src[1],path.scripts.src[0],path.scripts.src[1],path.scripts.src[2],path.img.src,path.pug.src[0],path.pug.src[1],path.html.src[0],path.html.src[1]])
}

// Start
// Copy IMG
function copyImg() {
  return gulp.src(path.img.src)
    .pipe(gulp.dest(path.img.dest))
}

// Compress IMG
function compressImg() {
  return gulp.src(path.img.src)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(path.img.dest))
}

// Watch IMG
function watchImg() {
  gulp.watch(path.img.src, gulp.series(copyImg, compressImg))
}

// Copy HTML
function copyHtml() {
  return gulp.src(path.html.src[0])
    .pipe(gulp.dest(path.html.dest))
}

// Watch HTML
function watchHtml() {
  gulp.watch(path.html.src[0], copyHtml)
}

// Compile PUG
function renderPug() {
  return gulp.src(path.pug.src[0])
    .pipe(pug())
    .pipe(gulp.dest(path.pug.dest))
}

// Watch PUG
function watchPug() {
  gulp.watch(path.pug.src[0], renderPug)
}

// Style
function bundleStyle () {
  return gulp.src(path.style.src, { sourcemaps: false})
    .pipe(concat('style.css'))
    .pipe(sass())
    .pipe(sourcemaps.write('.', { sourceRoot: 'css-source' }))
    .pipe(gulp.dest(path.style.dest))
}

// Watch Style
function watchStyle() {
  gulp.watch(path.style.src, bundleStyle)
}

// JS
function bundleScript() {
  return gulp.src(path.scripts.src, { sourcemaps: false })
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.scripts.dest))
}

// Watch JS
function watchScript() {
  gulp.watch(path.scripts.src, bundleScript)
}

// Build
// Compress & uncompress styles
function buildStyle_compress() {
  var plugins = [
    autoprefixer({ brocustomers: ['last 20 version'] }),
    cssnano(),
  ]
  return gulp.src(path.style.src[1])
    .pipe(concat('style.css'))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest(path.cache.src[0]))
}

function buildStyle_concat() {
  return (gulp.src([path.style.src[0],path.cache.css]))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.style.dest))
}

// Compress & uncompress "custom" script
function buildScript_uncompress() {
  return gulp.src(path.scripts.src, { sourcemaps: false })
    .pipe(concat('main.uncompress.js'))
    .pipe(gulp.dest(path.scripts.dest))
}

function buildScript_compress() {
  return gulp.src(path.scripts.src, { sourcemaps: true })
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.scripts.dest))
}

// Tasks
gulp.task('clean', clean)
gulp.task('cleanAll', cleanAll)

gulp.task('start', gulp.series(
  clean,
  gulp.parallel(
    gulp.series(
      gulp.parallel(copyImg),
      gulp.parallel(compressImg)
    ),
    copyHtml,
    renderPug,
    bundleScript,
    bundleStyle
  )
))

gulp.task('watch', gulp.series(
  'start',
  gulp.parallel(
    watchImg,
    watchHtml,
    watchPug,
    watchScript,
    watchStyle
  )
))

gulp.task('build', gulp.series(
  clean,
  gulp.parallel(
    gulp.series(
      gulp.parallel(copyImg),
      gulp.parallel(compressImg)
    ),
    copyHtml,
    renderPug,
    gulp.series(buildStyle_compress,buildStyle_concat),
    buildScript_uncompress,
    buildScript_compress
  )
))
