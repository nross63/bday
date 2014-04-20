var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    imageop = require('gulp-image-optimization'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer');
    
// Autoprefix SCSS/CSS targeting last 2 verstions, browsers > 5%, ie 9, ie 8
gulp.task('prefix', function(){
	gulp.src('./css/*.css')
  		.pipe(prefix(["last 1 version", "ie 8", "ie 7"], { cascade: true }))
  		.pipe(gulp.dest('./css/'));
});

// Compile SASS to CSS JS
gulp.task('sass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// Lint JS
gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('minifyJS', function(){
  return gulp.src('src/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

// Concat & Minify CSS
gulp.task('minifyCSS', function(){
  return gulp.src('./css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename('all.min.css'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/css/'));
});

// Watch JS
gulp.task('watchJS', function() {
  gulp.watch('src/*.js', ['lint', 'minifyJS']);
});

// Watch CSS
gulp.task('watchSCSS', function() {
  gulp.watch('scss/**/*.scss', ['sass','minifyCSS']);
});

// Default
gulp.task('default', ['watchSCSS', 'watchJS']);