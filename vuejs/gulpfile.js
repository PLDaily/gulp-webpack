/**
 Gulpfile for gulp-webpack
 created by PLDaily
*/

var gulp = require('gulp');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var md5 = require('gulp-md5-plus');

gulp.task('webpack', function() {
  return gulp.src('./src/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload())

})

gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['webpack','build.index'])
        .on('end', done);
});

gulp.task('script',['webpack'], function() {
  return gulp.src('./dist/js/*.js')
    .pipe(uglify())
    .pipe(md5(10, './dist/*.html'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: './dist'
  });
});

gulp.task('build.index', function(){
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});

//发布
gulp.task('default', ['webserver', 'webpack', 'build.index', 'script']);

//测试
gulp.task('dev', ['webserver', 'webpack', 'build.index', 'watch']);
