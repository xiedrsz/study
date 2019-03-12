var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	amdOptimize = require('amd-optimize');

gulp.task('default', function () {
	return gulp
		.src('./**/*.js')
		.pipe(amdOptimize('./config/main', { // 根据 'src/jQuery' 来查找模块的位置,也是打包后的模块名
			configFile: "./config/main.js",
			baseUrl: './'
		}))
		.pipe(concat('main.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('./dest/'));
});

// 由于 baseUrl 的问题，打包后需要将 './config/main' 的模块名改为 'main' 才能使用