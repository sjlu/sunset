var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var nib = require('nib');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var templateCache = require('gulp-angular-templatecache');
var jade = require('gulp-jade');
var _ = require('lodash');
var uglify = require('gulp-uglifyjs');
var path = require('path');

gulp.task('stylus', function() {
  gulp
    .src('./public/styles/styles.styl')
    .pipe(plumber())
    .pipe(stylus({
      compress: true,
      use: nib(),
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: 'public/build',
      }
    }))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '.'
    }))
    .pipe(gulp.dest('./public/build'))
    .pipe(livereload())
});

gulp.task('less', function() {
  gulp
    .src('./public/styles/bootstrap.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/build'))
    .pipe(livereload())
});

gulp.task('html', function() {
  gulp
    .src('./public/client/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      doctype: 'html'
    }))
    .pipe(templateCache({
      filename: 'templates.js',
      standalone: true,
      base: function(file) {
        return path.basename(file.path);
      }
    }))
    .pipe(gulp.dest('./public/build/client'))
    .pipe(livereload())
});

gulp.task('js', function() {
  gulp
    .src('./public/client/**/*.js')
    .pipe(plumber())
    .pipe(uglify('app.js', {
      mangle: false,
      outSourceMap: true
    }))
    .pipe(gulp.dest('./public/build/client'))
    .pipe(livereload())
})

gulp.task('watch', function() {
  livereload.listen({
    port: 22746
  });

  var changed = function(file) {
    var ext = path.extname(file.path);
    switch(ext) {
      case '.js': gulp.start('js'); break;
      case '.jade': gulp.start('html'); break;
      case '.styl': gulp.start('stylus'); break;
      case '.less': gulp.start('less'); break;
    }
  }

  _.each([
    './public/client/**/*.js',
    './public/client/**/*.jade',
    './public/client/**/*.styl',
    './public/styles/**/*.styl',
    './public/styles/bootstrap.less',
    './views/*'
  ], function(path) {
    watch(path, changed);
  });
});

gulp.task('default', ['stylus', 'less', 'html', 'js']);

