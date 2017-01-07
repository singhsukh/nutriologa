var src = './src',
  dist = './dist',
  bower = './bower_components',
  package = require('./package.json').name;

module.exports = {
  paths: {
    src: {
      styl: src + '/styl/**/*.styl',
      stylMain: src + '/styl/main.styl',
      js: src + '/js/**/*.js',
      img: src + '/img/**/*.*',
      favicon: src + '/favicon.ico',
      fonts: src + '/fonts/**/*.*',
      templates: src + '/templates/**/*.njk',
      templatesFolder: src + '/templates/',
      partialTemplates: src + '/templates/partials/*.njk',
      sectionTemplates: src + '/templates/sections/*.njk',
      root: src
    },
    dist: {
      css: dist + '/css/',
      js: dist + '/js/',
      img: dist + '/img/',
      fonts: dist + '/fonts/',
      html: dist + '/*.html',
      root: dist 
    },
    bower: function (package) {
      return bower + '/' + package;
    }
  },
  outputs: {
    libs: function (extension) {
      return package + '.libs.' + extension; 
    },
    files: function (extension) {
      return package + '.' + extension; 
    }
  }
};