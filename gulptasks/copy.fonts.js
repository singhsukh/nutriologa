var gulp = require('gulp'),
  paths = require('../gulpfile.config').paths;

gulp.task('copy:fonts', function () {
  gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts));
});