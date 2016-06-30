/* jshint globalstrict: true */
/* globals require */

'use strict';

function getAllFuncs() {
	var funcsArray = [];

	for (var x in funcs) {
		funcsArray.push(funcs[x]);
	}
	
	return funcsArray;
}

var gulp 			= require('gulp'),
	sass			= require('gulp-sass'),
	autoprefixer	= require('gulp-autoprefixer'),
	livereload 		= require('gulp-livereload'),

	resourcesPath 	= 'assetuse/resources/',
	srcPath 		= resourcesPath + 'src/',
	distPath 		= resourcesPath + 'dist/',

	funcs = {
		sass: 	'sass',
		js: 	'js',
		watch: 	'watch'
	}
;

// Compile Our Sass
gulp.task(funcs.sass, function() {
	return gulp.src(srcPath + 'sass/main.scss')
		.pipe(sass({
			outputStyle: 'expanded',
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', '> 1%', 'ie >= 9'],
			cascade: false
		}))
		.pipe(gulp.dest(distPath + 'css'))
		.pipe(livereload());
});

// Libraries
gulp.task(funcs.js, function() {
	return gulp.src(srcPath + 'js/main.js')
		.pipe(gulp.dest(distPath + 'js'))
		.pipe(livereload());
});

// Watch Files For Changes
gulp.task(funcs.watch, function() {
	livereload.listen();

	gulp.watch(srcPath + 'sass/*.scss', [funcs.sass]);
	gulp.watch(srcPath + 'js/*.js', 	[funcs.js]);
});

// Default Task
gulp.task('default', getAllFuncs());
