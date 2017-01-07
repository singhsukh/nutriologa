var gulp = require('gulp'),
  config = require('../gulpfile.config'),
  bowerFiles = require('main-bower-files'),
  cssmin = require('gulp-minify-css'),
  cssconcat = require('gulp-concat-css'),
  jsconcat = require('gulp-concat'),
  uglify = require('gulp-uglify');

gulp.task('build:bower', function () {
  // gulp.src(bowerFiles('**/*.css', {group: 'css'}))
  //   .pipe(cssconcat(config.outputs.libs('css')))
  //   .pipe(cssmin({processImport: false}))
  //   .pipe(gulp.dest(config.paths.dist.css));

  gulp.src(bowerFiles('**/*.js', {group: 'js'}))
    .pipe(jsconcat(config.outputs.libs('js')))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist.js));
});