var gulp = require('gulp'),
  config = require('../gulpfile.config'),
  stylus = require('gulp-stylus'),
  bootstrap = require('bootstrap-styl'),
  autoprefixer = require('autoprefixer-stylus')
  import_tree = require('stylus-import-tree'),
  cssmin = require('gulp-minify-css');

gulp.task('build:styles', function () {
  gulp.src(config.paths.src.stylMain)
  .pipe(stylus({
    use: [bootstrap(), autoprefixer('last 2 versions')],
    define: {
      import_tree: import_tree
    }
  }))
  .pipe(cssmin({processImport: false}))
  .pipe(gulp.dest(config.paths.dist.css));
});