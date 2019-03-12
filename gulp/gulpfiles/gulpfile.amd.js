var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    amdOptimize = require('amd-optimize');

gulp.task('default', function () {
    return gulp
        .src('./src/*.js')
        .pipe(amdOptimize('src/jQuery', { // 根据 'src/jQuery' 来查找模块的位置
            name: "jQuery", // 貌似没用
            configFile: "./src/jQuery.js",
            baseUrl: './src/'
        }))
        .pipe(concat('jQuery.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dest/'));
});