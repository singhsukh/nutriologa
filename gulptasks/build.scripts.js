var gulp = require('gulp'),
  config = require('../gulpfile.config'),
  jsconcat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint');

gulp.task('build:js', function () {
  gulp.src(config.paths.src.js)
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jsconcat(config.outputs.files('js')))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist.js));
});