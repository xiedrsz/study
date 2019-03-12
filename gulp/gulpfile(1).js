 // ºÏ²¢Ñ¹Ëõ
 
 var gulp = require('gulp'),
	amdOptimize = require('amd-optimize'),
	concat = require('gulp-concat'),
	ngAnnotate = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify');

gulp.task('js', function () {
  return gulp
	 .src('./www/dist/js/main.js')
     .pipe(amdOptimize('main',
		{
			name: "main",
            configFile: "./www/dist/main.js",
            baseUrl: './www/dist/'
        }
	))
	.pipe(concat('main.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
    .pipe(gulp.dest('www/dist/app/'));
});