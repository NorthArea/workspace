/*Gulp*/
// Automation
const gulp = require("gulp");
// Pipes streams together and destroys all of them if one of them closes.
const pump = require('pump');
// Replaces pipe method and removes standard onerror handler on error event
const plumber = require('gulp-plumber');
/*File*/
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


/*Devtools*/

/*Framework*/
gulp.task('framework', function() {
  gulp.src('source/framework/*.html')
    .pipe(gulp.dest('dev/'));
  gulp.src('source/framework/img/**')
    .pipe(gulp.dest('dev/img/'));
  gulp.src('source/framework/css/**')
    .pipe(gulp.dest('dev/css/'));
  gulp.src('source/framework/js/**')
    .pipe(gulp.dest('dev/js/'));
});


// Compress PNG, JPEG, GIF, SVG and copy them in /dev/img/ and replace copyImg()
gulp.task('compressImg', function() {
  gulp.src('source/img/**')
    .pipe(gulp.dest('dev/img/'));
  gulp.src('source/images/**')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest('dev/img/'))
});

gulp.task('compressImg_w', function() {
  gulp.watch('source/img/**', ['compressImg']);
});


/*HTML*/
// Copy HTML  from ./source to ./test
gulp.task('copyHtml', function() {
  gulp.src('source/*.html')
    .pipe(gulp.dest('dev/'));
});

// Watch HTML
gulp.task('copyHtml_w', function() {
  gulp.watch('source/*.html', ['copyHTML']);
});


/*PUG*/
// Compile PUG to HTML
gulp.task('pug', function buildHTML() {
  return gulp.src('./source/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./dev/'))
});

// Watch PUG
gulp.task('pug_w', function() {
  gulp.watch('source/*.pug', ['pug']);
});

/*SCSS*/
// Compile SCSS
gulp.task('scss', function() {
  return gulp.src('source/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dev/css/'));
});

// Watch SASS/SCSS
gulp.task('scss_w', function() {
  gulp.watch('source/scss/*.scss', ['scss']);
});


/*JS*/
// Concatenate JS
gulp.task('concatJs', function(cb) {
  pump([
      gulp.src('source/js/*.js'),
      sourcemaps.init(),
      plumber(),
      concat('bundle.js'),
      sourcemaps.write('.'),
      gulp.dest('test/js/'), // save .js
    ],
    cb
  );
});

gulp.task('concatJs_w', function() {
  gulp.watch('source/js/*.js', ['concatJs']);
});


/*Script*/

// Start(restart) Development
gulp.task('start', ['framework','compressImg', 'pug', 'copyHtml', 'scss', 'concatJs']);

// Start Watch TEST
gulp.task('watch', ['start', 'framework', 'compressImg_w', 'pug_w', 'copyHtml_w', 'scss_w', 'concatJs_w']);


/*DIST*/

/*File*/
//Copy file from dev to dist
gulp.task('copy_dist', function() {
  gulp.src('dev/*.html')
    .pipe(gulp.dest('dist/'));
  gulp.src('dev/img/**')
    .pipe(gulp.dest('dist/img/'));
  gulp.src('dev/css/**')
    .pipe(gulp.dest('dist/css/'));
  gulp.src('dev/js/**')
    .pipe(gulp.dest('dist/js/'));
});


/*CSS*/
// PostCSS style.css
gulp.task('postCss_dist', function() {
  var plugins = [
    autoprefixer({ browsers: ['last 4 version'] }),
    cssnano(),
  ];
  return gulp.src('./dev/css/style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
    
});

// PostCSS styles.css
gulp.task('postCss2_dist', function() {
  var plugins = [
    autoprefixer({ browsers: ['last 4 version'] }),
    cssnano(),
  ];
  return gulp.src('./dev/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
    
});

// PostCSS & concat all css
gulp.task('concatCss_dis', function() {
  var plugins = [
    autoprefixer({ browsers: ['last 4 version'] }),
    cssnano(),
  ];
  return gulp.src('./dev/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat("style.css"))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});



/*JS*/
// Compress JS
gulp.task('compressJs_dist', function(cb) {
  pump([
      gulp.src('dist/js/bundle.js'),
      sourcemaps.init(),
      plumber(),
      uglify(),
      rename({ extname: '.min.js' }),
      sourcemaps.write('.'),
      gulp.dest('dist/js/'), // save .min.js
    ],
    cb
  );
});


/*Script*/
// Distribution code

// Distribution with compress bundle.js and concat all css
gulp.task('dist', ['copy_dist', 'concatCss_dis', 'compressJs_dist']);

// Distribution with compress bundle.js and withOUT concat all css
gulp.task('dist_without-concat-css', ['copy_dist', 'postCss_dist','postCss2_dist', 'compressJs_dist']);


























/*
gulp.src('source/framework/*.html')
    .pipe(gulp.dest('test/'));

gulp.task('concatJS', function(cb) {
  pump([
      gulp.src('source/js/*.js'),
      sourcemaps.init(),
      plumber(),
      concat('bundle.js'),
      sourcemaps.write('.'),
      gulp.dest('test/js/'), // save .js
    ],
    cb
  );
});

gulp.task('copyHTML', function(cb) {
  pump([],cb);
});


//File
// Compress PNG, JPEG, GIF and SVG images
gulp.task('compressImage', () =>
  gulp.src('source/images/*')
  .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
  ]))
  .pipe(gulp.dest('test/images/'))
);


//HTML
// Copy HTML  from ./source to ./test
gulp.task('copyHTML', function() {
  gulp.src('source/*.html')
    .pipe(gulp.dest('test/'));
});

// Compile PUG to HTML
gulp.task('pug', function buildHTML() {
  return gulp.src('source/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('test/'))
});

//CSS
// Copy CSS  from ./source to ./test
gulp.task('copyCSS', function() {
  gulp.src('source/scss/*.css')
    .pipe(gulp.dest('test/css/'));
});

// Compile SCSS
gulp.task('scss', function() {
  return gulp.src('source/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('test/css/'));
});

//JS
// Concatenate JS
gulp.task('concatJS', function(cb) {
  pump([
      gulp.src('source/js/*.js'),
      sourcemaps.init(),
      plumber(),
      concat('bundle.js'),
      sourcemaps.write('.'),
      gulp.dest('test/js/'), // save .js
    ],
    cb
  );
});

//Watch Test

// Watch IMG
gulp.task('compressImage_w', function() {
  gulp.watch('source/images/*', ['compressImage']);
});

// Watch HTML
gulp.task('copyHTML_w', function() {
  gulp.watch('source/*.html', ['copyHTML']);
});

// Watch PUG
gulp.task('pug_w', function() {
  gulp.watch('source/*.pug', ['pug']);
});

// Watch CSS
gulp.task('copyCSS_w', function() {
  gulp.watch('source/css/*.css', ['copyCSS']);
});

// Watch SASS/SCSS
gulp.task('scss_w', function() {
  gulp.watch('source/css/scss/*.scss', ['scss']);
});

// Watch PUG
gulp.task('concatJS_w', function() {
  gulp.watch('source/js/*.js', ['concatJS']);
});

//Script

// Start(restart) TEST
gulp.task('start', ['compressImage', 'pug', 'copyHTML', 'copyCSS', 'scss', 'concatJS']);

// Start Watch TEST
gulp.task('default', ['start', 'compressImage_w', 'pug_w', 'copyHTML_w', 'copyCSS_w', 'scss_w', 'concatJS_w']);

//DIST

//IMG
// Copy img  from ./test to ./dist
gulp.task('copyImage_dist', function() {
  gulp.src('test/images/*')
    .pipe(gulp.dest('dist/images/'));
});

//HTML
// Copy HTML  from ./test to ./dist
gulp.task('copyHTML_dist', function() {
  gulp.src('test/*.html')
    .pipe(gulp.dest('dist/'));
});

//CSS
// PostCSS
gulp.task('postCSS_dist', function() {
  var plugins = [
    autoprefixer({ browsers: ['last 4 version'] }),
    cssnano(),
  ];
  return gulp.src('./test/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('concatCSS_dis', function() {
  var plugins = [
    autoprefixer({ browsers: ['last 4 version'] }),
    cssnano(),
  ];
  return gulp.src('./test/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat("main.css"))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

//JS
// Compress JS
gulp.task('compressJS_dist', function(cb) {
  pump([
      gulp.src('test/js/*.js'),
      sourcemaps.init(),
      plumber(),
      concat('main.js'),
      gulp.dest('dist/js/'), // save .js
      uglify(),
      rename({ extname: '.min.js' }),
      sourcemaps.write('.'),
      gulp.dest('dist/js/'), // save .min.js
    ],
    cb
  );
});

// Compress JS
gulp.task('compressJS_dist', function(cb) {
  pump([
      gulp.src('test/js/*.js'),
      sourcemaps.init(),
      plumber(),
      concat('main.js'),
      gulp.dest('dist/js/'), // save .js
      uglify(),
      rename({ extname: '.min.js' }),
      sourcemaps.write('.'),
      gulp.dest('dist/js/'), // save .min.js
    ],
    cb
  );
});

//Script

// Start(restart) DIST
gulp.task('dist', ['copyImage_dist', 'copyHTML_dist', 'concatCSS_dis', 'compressJS_dist']);

*/




