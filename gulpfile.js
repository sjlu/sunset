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
    .pipe(gulp.dest('./public/build'));
});

gulp.task('less', function() {
  gulp
    .src('./public/styles/bootstrap.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/build'))
});

gulp.task('html', function() {
  gulp
    .src('./public/client/**/*.jade')
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
    .pipe(gulp.dest('./public/build/client'));
});

gulp.task('js', function() {
  gulp
    .src('./public/client/**/*.js')
    .pipe(uglify('app.js', {
      mangle: false
    }))
    .pipe(gulp.dest('./public/build/client'))
})

gulp.task('watch', function() {
  livereload.listen(22746);
  gulp.watch('./public/client/**/*.js', ['js']).on('change', livereload.changed);
  gulp.watch('./public/client/**/*.jade', ['html']).on('change', livereload.changed);
  gulp.watch('./public/client/**/*.styl', ['stylus']).on('change', livereload.changed);
  gulp.watch('./public/styles/**/*.styl', ['stylus']).on('change', livereload.changed);
  gulp.watch('./public/styles/bootstrap.less', ['less']).on('change', livereload.changed);
  gulp.watch('./views/*').on('change', livereload.changed);
});

gulp.task('default', ['stylus', 'less', 'html', 'js']);

