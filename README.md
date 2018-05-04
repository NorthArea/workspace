# workspace
npm workspace with gulp
```bash
  npm install
  npm install -g gulp-cli
```
"devDependencies": {
    "autoprefixer": "^8.4.1",
    "cssnano": "^3.10.0",
    "gulp": "^3.9.1",
    "gulp-concat": "^2.6.1",
    "gulp-imagemin": "^4.1.0",
    "gulp-plumber": "^1.2.0",
    "gulp-postcss": "^7.0.1",
    "gulp-pug": "^4.0.1",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^4.0.1",
    "gulp-sourcemaps": "^2.6.4",
    "gulp-uglify": "^3.0.0",
    "pump": "^3.0.0"
  }

./source -  for source.


```bash
  gulp watch
```
it create ./dev - dir for development and concat your js's in ./dev/js/bundle.js
watch: imagemin, sass, pug, concat js.

```bash
  gulp dist
```
it create ./dev - for distribution code
dist:postcss, uglify, autoprefixer, cssnano.
