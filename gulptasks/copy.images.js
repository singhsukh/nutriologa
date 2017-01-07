var gulp = require('gulp'),
  config = require('../gulpfile.config'),
  imagemin = require('gulp-imagemin');

gulp.task('copy:images', function () {
  gulp.src(config.paths.src.img)
  .pipe(imagemin())
  .pipe(gulp.dest(config.paths.dist.img));

  gulp.src(config.paths.src.favicon)
  .pipe(gulp.dest(config.paths.dist.root));
});