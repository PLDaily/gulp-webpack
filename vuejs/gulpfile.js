/**
 Gulpfile for gulp-webpack
 created by PLDaily
*/

var gulp = require('gulp');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var md5 = require('gulp-md5-plus');
var clean = require('gulp-clean');


gulp.task('webpack',['build.img'], function() {
  return gulp.src('./src/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload())

})

gulp.task('watch', function (done) {
    return gulp.watch('src/**/*', ['webpack'])
        .on('end', done);
});

gulp.task('script', ['webpack'], function() {
  return gulp.src('./dist/js/*.js')
    .pipe(uglify())
    .pipe(md5(10, './dist/*.html'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('webserver', ['build.index'], function() {
  connect.server({
    livereload: true,
    root: './dist'
  });
});

gulp.task('build.img', ['build.index'], function() {
  return gulp.src('./src/img/**')
  .pipe(gulp.dest('./dist/img'));
})

gulp.task('build.index', ['clean'], function(){
  return gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return gulp.src('./dist')
        .pipe(clean());
});

//发布
gulp.task('default', ['clean', 'webpack', 'build.index', 'build.img', 'script', 'webserver']);

//测试
gulp.task('dev', ['clean', 'webpack', 'build.index', 'build.img', 'watch', 'webserver']);
