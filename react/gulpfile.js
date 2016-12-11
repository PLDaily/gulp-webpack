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
	return gulp.src('./app.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('./project/js'))
		.pipe(connect.reload())
})

gulp.task('watch', function (done) {
    gulp.watch('public/**/*', ['webpack','build.index'])
        .on('end', done);
});

gulp.task('script',['webpack'], function() {
  return gulp.src('./project/js/*.js')
    .pipe(uglify())
    .pipe(md5(10, './project/*.html'))
    .pipe(gulp.dest('./project/js'))
    
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: './project'
  });
});

gulp.task('build.index', function(){
  return gulp.src('./public/index.html')
    .pipe(gulp.dest('./project'));
});

//发布
gulp.task('default', ['webserver', 'webpack', 'build.index', 'script']);

//测试
gulp.task('dev', ['webserver', 'webpack', 'build.index', 'watch']);
