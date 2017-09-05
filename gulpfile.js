'use strict'


const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const concat 		= require('gulp-concat');
const uglify 		= require('gulp-uglifyjs');
const sourcemaps 	= require('gulp-sourcemaps');
const cssmin 		= require('gulp-cssmin');
const jsmin 		= require('gulp-jsmin');
const rename 		= require('gulp-rename');
const del 			= require('del');
const browserSync 	= require('browser-sync').create();
const imagemin 		= require('gulp-imagemin');
const ts			= require('gulp-typescript');




gulp.task('ts', function () {

    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'main.js',
            target: 'ES5'

}))
        .pipe(gulp.dest('src/js'));
});



gulp.task('sass', function () {

  return gulp.src(['src/sass/**/*.sass','src/sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8'],
            cascade: true
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
     .pipe(browserSync.stream());

});

gulp.task('scripts', function () {
    gulp.src('src/**/*.js')
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets'));
});

gulp.task('css', function () {
    gulp.src('src/**/*.css')
        .pipe(cssmin())
        .pipe(autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8'],
            cascade: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets'));
});

gulp.task('imgmin', function(){
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/img'))
});


gulp.task('browser-sync', function(){
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});
});

gulp.task('clean', function(){
	return del.sync('assets')
});
gulp.task('watch',['browser-sync', 'sass', 'ts'],function(){
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
	gulp.watch('src/**/*.ts',['ts'], browserSync.reload);
	gulp.watch('src/css/**/*.css', browserSync.reload);

});

gulp.task('build',['clean','imgmin','css','scripts'], function(){
	var buildHtml = gulp.src('src/**/*.html')
		.pipe(gulp.dest('assets'));
	var builFonts = gulp.src('src/fonts/**/*.*')
		.pipe(gulp.dest('assets/fonts'));
	var builFonts = gulp.src('src/templates/**/*.*')
		.pipe(gulp.dest('assets/templates'))


});

