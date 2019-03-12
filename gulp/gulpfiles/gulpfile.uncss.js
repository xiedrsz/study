var gulp = require('gulp'),
    uncss = require('gulp-uncss');

gulp.task('default', function () {
    return gulp.src('./src/assets/css/app.css')
        .pipe(uncss({
            html: ['./src/components/vux/*.xvue', './src/modules/*.xvue']
        }))
        .pipe(gulp.dest('dest/'));
});