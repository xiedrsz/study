var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin');

gulp.task('default', function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
        minifyJS: false, //压缩页面JS
        minifyCSS: false //压缩页面CSS
    };
    gulp.src('src/modules/*.xvue')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dest/'));
});