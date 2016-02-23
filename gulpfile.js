var argv = require('yargs').argv;
var gulp = require('gulp');
var mjml = require('gulp-mjml');
var replace = require('gulp-replace');
var inject = require('gulp-inject');
var notify = require('gulp-notify');
var del = require('del');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var _publicPath = './dist';
var _sourcePath = './src';
var _livePath = 'http://www.example.com/assets/img/';

argv.production = false;
argv.video = true;

gulp.task('build:mjml', ['clean:html', 'copy:images'], function () {
  gulp.src(_sourcePath + '/*.mjml')
    .pipe(mjml())
    .pipe(gulp.dest(_publicPath))
    .pipe(notify('gulped that shiz'))
});

// images

gulp.task('copy:images', ['clean:images', 'optimize:images'], function() {
  return gulp.src(_sourcePath + '/img/**/*')
    .pipe(gulp.dest(_publicPath + '/assets/img'))
});

gulp.task('optimize:images', function() {
  return gulp.src(_sourcePath + '/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(_publicPath + '/assets/img'))
});

// clean

gulp.task('clean:images', function (cb) { return del(_publicPath + '/assets/img', cb); });
gulp.task('clean:html', function (cb) { return del(_publicPath + '/*.html', cb); });

// default task

gulp.task('watch', function() {
  gulp.watch(_sourcePath + '/**/*.mjml', ['build:mjml']);
});

gulp.task('default', [ 'build:mjml' ], function() {
    gulp.start([ 'watch' ]);
});
