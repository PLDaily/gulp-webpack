var gulp = require('gulp');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

gulp.task('webpack', function() {
	return gulp.src('./app.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('./static/js'))
		.pipe(connect.reload())
})

gulp.task('watch', function (done) {
    gulp.watch('public/**/*', ['webpack','build.index'])
        .on('end', done);
});

gulp.task('script',['webpack'], function() {
  return gulp.src('./static/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./static/js'))
    
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: './'
  });
});

gulp.task('build.index', function(){
  return gulp.src('./public/index.html')
    .pipe(gulp.dest('./project'));
});

//发布
gulp.task('default', ['webpack', 'build.index', 'script']);

//测试
gulp.task('dev', ['webserver', 'webpack', 'build.index', 'watch']);
