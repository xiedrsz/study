var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename');

gulp.task('default', function () {
  return gulp
    .src('./src/extend.js')
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dest/'));
});