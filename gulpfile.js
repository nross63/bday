var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    imageop = require('gulp-image-optimization');

gulp.task('default', function () {

    gulp.src('scss/**/*.scss')
        .pipe(watch(function(files) {
            return files.pipe(sass())
                .pipe(gulp.dest('./css'));
        }));
});
