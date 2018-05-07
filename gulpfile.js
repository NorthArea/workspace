/*Gulp*/
// Automation
const gulp = require("gulp");
// Pipes streams together and destroys all of them if one of them closes.
const pump = require('pump');
// Replaces pipe method and removes standard onerror handler on error event
const plumber = require('gulp-plumber');

/*File*/
// Delete file
const del = require('del');
// Rename file rename({ extname: '.min.js' })
const rename = require("gulp-rename");
// Compress PNG, JPEG, GIF and SVG images
const imagemin = require('gulp-imagemin');

/*HTML*/
// Compile PUG to HTML
const pug = require('gulp-pug');

/*CSS*/
// Compile SASS to css
const sass = require('gulp-sass');
// PostCSS
const postcss = require('gulp-postcss');
// Add autoprefix
const autoprefixer = require('autoprefixer');
// Compress and optimize CSS
const cssnano = require('cssnano');
//CSS optimizer
const cleanCSS = require('gulp-clean-css');

/*JS*/
// Concatenate JS
const concat = require('gulp-concat');
// Compress JS
const uglify = require("gulp-uglify");
// Create map for JS
const sourcemaps = require('gulp-sourcemaps');


//Variables
var my = {
  styles: {
    src: 'source/scss/*.scss',
    dest: 'build/assets/css/'
  },
  scripts: {
    src: 'source/js/**/*.js',
    dest: 'build/assets/js/'
  },
  img: {
    src: 'source/img/**',
    dest: 'build/assets/img/'
  },
  html: {
    src: 'source/*.html',
    dest: 'build/'
  },
  pug: {
    src: 'source/*.pug',
    dest: 'build/'
  }
};

var framework = {
  styles: {
    src: 'source/framework/css/**/*.css',
    dest: 'build/assets/css/'
  },
  scripts: {
    src: 'source/framework/js/**/*.js',
    dest: 'build/assets/js/'
  },
  img: {
    src: 'source/framework/img/**',
    dest: 'build/assets/img/'
  }
};


//Functions
// Remove 'build' filder
function clean() {
  return del(['build']);
}

// Copy img
function copyMyImg() {
  return gulp.src(my.img.src)
    .pipe(gulp.dest(my.img.dest));
}

function copyFrameworkImg() {
  return gulp.src(framework.img.src)
    .pipe(gulp.dest(framework.img.dest));
}

// Compress PNG, JPEG, GIF, SVG and copy them in /dev/img/ and replace copyImg()
function compressMyImg() {
  return gulp.src(my.img.src)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(my.img.dest));
}

function compressFrameworkImg() {
  return gulp.src(framework.img.src)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(framework.img.dest));
}


// Watch Img
function watchMyImg() {
  gulp.watch(my.img.src, gulp.series(copyMyImg, compressMyImg));
}

function watchFrameworkImg() {
  gulp.watch(framework.img.src, gulp.series(copyFrameworkImg, compressFrameworkImg));
}


// PUG & HTML
// Copy HTML  from ./source to ./test
function copyMyHtml() {
  return gulp.src(my.html.src)
    .pipe(gulp.dest(my.html.dest));
}

// Compile PUG to HTML
function myPug() {
  return gulp.src(my.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(my.pug.dest));
}

// Watch
function watchMyHtml() {
  gulp.watch(my.html.src, copyMyHtml);
}

function watchMyPug() {
  gulp.watch(my.pug.src, myPug);
}


//JS, CSS, SASS
// "My" JS
function myScript() {
  return gulp.src(my.scripts.src, { sourcemaps: true })
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(my.scripts.dest));
}

// "My" SASS
function myStyle() {
  return gulp.src(my.styles.src, { sourcemaps: true })
    .pipe(sass())
    .pipe(gulp.dest(my.styles.dest));
}

// "Framework" JS
function frameworkScript() {
  return gulp.src(framework.scripts.src, { sourcemaps: true })
    .pipe(concat('framework.js'))
    .pipe(gulp.dest(framework.scripts.dest));
}

// "Framework" CSS
function frameworkStyle() {
  return gulp.src(framework.styles.src, { sourcemaps: true })
    .pipe(concat('framework.css'))
    .pipe(gulp.dest(framework.styles.dest));
}

// Watch "My" JS
function watchMyScript() {
  gulp.watch(my.scripts.src, myScript);
}

// Watch "My" SASS
function watchMyStyle() {
  gulp.watch(my.styles.src, myStyle);
}

// Watch Framework JS
function watchFrameworkScript() {
  gulp.watch(framework.scripts.src, myScript);
}

// Watch Framework CSS
function watchFrameworkStyle() {
  gulp.watch(framework.styles.src, myStyle);
}


// Start Tasks
gulp.task('clean', clean);

gulp.task('start', gulp.parallel(
  gulp.series(
    gulp.parallel(copyMyImg, copyFrameworkImg),
    gulp.parallel(compressMyImg, compressFrameworkImg)
  ),
  copyMyHtml, 
  myPug, 
  myScript, 
  myStyle, 
  frameworkScript, 
  frameworkStyle
));

gulp.task('watch', gulp.series(
  'start',
  gulp.parallel(
    watchMyImg,
    watchFrameworkImg,
    watchMyHtml,
    watchMyPug,
    watchMyScript,
    watchMyStyle,
    watchFrameworkScript,
    watchFrameworkStyle
)));


// Build





