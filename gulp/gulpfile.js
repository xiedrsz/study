var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('default', function () {
  return gulp
    .src('./log.js')
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dest/'));
});