var gulp = require('gulp'),
  config = require('../gulpfile.config'),
  connect = require('gulp-connect');
 
gulp.task('webserver:run', function() {
  connect.server({
    port: 8080,
    root: config.paths.dist.root,
    livereload: true
  });
});

gulp.task('webserver:reload', ['build:html'], function() {
  gulp.src(config.paths.dist.html)
  .pipe(connect.reload());
})
