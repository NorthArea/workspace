# workspace
npm workspace with gulp
```bash
  npm install
  npm install -g gulp-cli
```
devDependencies:  

gulp  
gulp-concat  
gulp-imagemi  
gulp-plumber  
gulp-postcss  
gulp-pug  
gulp-rename  
gulp-sass  
gulp-sourcemaps  
gulp-uglify  
autoprefixer  
cssnano  
pump  

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
