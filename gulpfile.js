/*Gulp*/
// Automation
const gulp = require("gulp");
// Pipes streams together and destroys all of them if one of them closes.

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

/*JS*/
// Concatenate JS
const concat = require('gulp-concat');
// Compress JS
const uglify = require("gulp-uglify");
// Create map for JS
const sourcemaps = require('gulp-sourcemaps');


//Variables
var ws = {
  styles: {
    src: 'source/workspace/scss/*.scss',
    dest: 'build/assets/css/'
  },
  scripts: {
    src: 'source/workspace/js/**/*.js',
    dest: 'build/assets/js/'
  },
  img: {
    src: 'source/workspace/img/**/*',
    dest: 'build/assets/img/'
  },
  html: {
    src: 'source/workspace/*.html',
    dest: 'build/'
  },
  pug: {
    src: 'source/workspace/*.pug',
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
    src: 'source/framework/img/**/*',
    dest: 'build/assets/img/'
  }
};


//Functions

// File
//Remove ./build
function clean() {
  return del(['build']);
}

function cleanAll() {
  del(['build']);
  del([framework.styles.src]);
  del([framework.scripts.src]);
  del([framework.img.src]);
  del([ws.styles.src]);
  del([ws.scripts.src]);
  del([ws.img.src]);
  del([ws.html.src]);
  del([ws.pug.src]);
  return del(['source/workspace/scss/.sass-cache']);
}
gulp.task('cleanAll', cleanAll);

// Copy img
function copyWsImg() {
  return gulp.src(ws.img.src)
    .pipe(gulp.dest(ws.img.dest));
}

function copyFrameworkImg() {
  return gulp.src(framework.img.src)
    .pipe(gulp.dest(framework.img.dest));
}

// Compress PNG, JPEG, GIF, SVG and copy them in /dev/img/ and replace copyImg()
function compressWsImg() {
  return gulp.src(ws.img.src)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest(ws.img.dest));
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
function watchWsImg() {
  gulp.watch(ws.img.src, gulp.series(copyWsImg, compressWsImg));
}

function watchFrameworkImg() {
  gulp.watch(framework.img.src, gulp.series(copyFrameworkImg, compressFrameworkImg));
}


// PUG & HTML
// Copy HTML  from ./source to ./test
function copyWsHtml() {
  return gulp.src(ws.html.src)
    .pipe(gulp.dest(ws.html.dest));
}

// Compile PUG to HTML
function wsPug() {
  return gulp.src(ws.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(ws.pug.dest));
}

// Watch
function watchWsHtml() {
  gulp.watch(ws.html.src, copyWsHtml);
}

function watchWsPug() {
  gulp.watch(ws.pug.src, wsPug);
}


//JS, CSS, SASS
// "Ws" JS
function wsScript() {
  return gulp.src(ws.scripts.src, { sourcemaps: true })
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(ws.scripts.dest));
}

// "Ws" SASS
function wsStyle() {
  return gulp.src(ws.styles.src, { sourcemaps: true })
    .pipe(sass())
    .pipe(sourcemaps.write('.', { sourceRoot: 'css-source' }))
    .pipe(gulp.dest(ws.styles.dest));
}

// "Framework" JS
function frameworkScript() {
  return gulp.src(framework.scripts.src, { sourcemaps: true })
    .pipe(concat('framework.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(framework.scripts.dest));
}

// "Framework" CSS
function frameworkStyle() {
  var plugins = [
    cssnano(),
  ];
  return gulp.src(framework.styles.src, { sourcemaps: true })
    .pipe(concat('framework.css'))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.', { sourceRoot: 'css-source' }))
    .pipe(gulp.dest(framework.styles.dest));
}

// Watch "Ws" JS
function watchWsScript() {
  gulp.watch(ws.scripts.src, wsScript);
}

// Watch "Ws" SASS
function watchWsStyle() {
  gulp.watch(ws.styles.src, wsStyle);
}

// Watch Framework JS
function watchFrameworkScript() {
  gulp.watch(framework.scripts.src, wsScript);
}

// Watch Framework CSS
function watchFrameworkStyle() {
  gulp.watch(framework.styles.src, wsStyle);
}


// Build
// Compress & uncompress "Ws" style
function wsStyleBuild_uncompress() {
  return gulp.src(ws.styles.src, { sourcemaps: true })
    .pipe(sass())
    .pipe(rename({ extname: '.uncompress.css' }))
    .pipe(sourcemaps.write('.', { sourceRoot: 'css-source' }))
    .pipe(gulp.dest(ws.styles.dest));
}

function wsStyleBuild_compress() {
  var plugins = [
    autoprefixer({ browsers: ['last 8 version'] }),
    cssnano(),
  ];
  return gulp.src(ws.styles.src, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.', { sourceRoot: 'css-source' }))
    .pipe(gulp.dest(ws.styles.dest));
}

// Compress & uncompress "Ws" script
function wsScriptBuild_uncompress() {
  return gulp.src(ws.scripts.src, { sourcemaps: true })
    .pipe(concat('bundle.uncompress.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(ws.scripts.dest));
}

function wsScriptBuild_compress() {
  return gulp.src(ws.scripts.src, { sourcemaps: true })
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(ws.scripts.dest));
}

// Tasks
gulp.task('clean', clean);

gulp.task('start', gulp.series(
  clean,
  gulp.parallel(
    gulp.series(
      gulp.parallel(copyWsImg, copyFrameworkImg),
      gulp.parallel(compressWsImg, compressFrameworkImg)
    ),
    copyWsHtml,
    wsPug,
    wsScript,
    wsStyle,
    frameworkScript,
    frameworkStyle
  )
));

gulp.task('watch', gulp.series(
  'start',
  gulp.parallel(
    watchWsImg,
    watchFrameworkImg,
    watchWsHtml,
    watchWsPug,
    watchWsScript,
    watchWsStyle,
    watchFrameworkScript,
    watchFrameworkStyle
  )
));

gulp.task('build', gulp.series(
  clean,
  gulp.series(
    gulp.parallel(copyWsImg, copyFrameworkImg),
    gulp.parallel(compressWsImg, compressFrameworkImg)
  ),
  gulp.parallel(
    copyWsHtml,
    wsPug,
    wsScriptBuild_uncompress,
    wsScriptBuild_compress,
    wsStyleBuild_uncompress,
    wsStyleBuild_compress,
    frameworkScript,
    frameworkStyle
  )
));
