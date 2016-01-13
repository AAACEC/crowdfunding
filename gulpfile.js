'use strict';

let _ = require('lodash'),
	st = require('st'),
	argv = require('yargs').argv,
	http = require('http'),
	gulp = require('gulp'),
	swig = require('gulp-swig'),
	sass = require('gulp-sass'),
	babel = require('gulp-babel'),
	gulpif = require('gulp-if'),
	eslint = require('gulp-eslint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cssnano = require('gulp-cssnano'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	livereload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	babelES2015 = require('babel-preset-es2015'),
	babelStage2 = require('babel-preset-stage-2');

const vendor = {
	scripts: [
		'node_modules/odometer/odometer.js',
		'node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
		'node_modules/scrollmagic/scrollmagic/uncompressed/plugins/jquery.ScrollMagic.js',
	],

	styles: [
		'node_modules/odometer/odometer-theme-minimal.css',
	],
};

function isVendorScript(f) {
	return _.any(vendor.scripts, (v) => {
		return f.path.replace(/\\/g, '/').endsWith(v);
	});
}

if (!argv.production) {
	vendor.scripts.push('node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');
}

// Server - listed on localhost:8080
gulp.task('webserver', () => {
	http.createServer(
		st({
			path: __dirname + '/dist',
			index: 'index.html',
			cache: false,
		})
	).listen(8080);
});

gulp.task('styles', () => {
	return gulp.src(vendor.styles.concat(['sass/styles.scss']))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(autoprefixer())
		.pipe(gulpif(argv.production, cssnano()))
		.pipe(concat('crowdfunding.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'))
		.pipe(livereload())
		.pipe(notify({ message: 'Styles task complete', onLast: true }));
});

// Lint JS
gulp.task('lint', () => {
	return gulp.src(['js/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// Concatenate & Minify JS
gulp.task('scripts', ['lint'], () => {
	return gulp.src(vendor.scripts.concat(['js/**/*.js']))
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(gulpif(_.negate(isVendorScript), babel({
			presets: [babelES2015, babelStage2],
			compact: false,
		})))
		.pipe(gulpif(argv.production, uglify()))
		.pipe(concat('crowdfunding.min.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(livereload())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({ message: 'Scripts task complete', onLast: true }));
});

// Images
gulp.task('images', () => {
	return gulp.src('img/**/*')
		.pipe(plumber())
		.pipe(gulpif(argv.production, imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true,
			multipass: true,
		})))
		.pipe(gulp.dest('dist/img'))
		.pipe(livereload())
		.pipe(notify({ message: 'Images task complete', onLast: true }));
});

// Templates
gulp.task('templates', () => {
	return gulp.src('swig/index.swig')
		.pipe(plumber())
		.pipe(swig({defaults: {cache: false}}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist'))
		.pipe(livereload())
		.pipe(notify({ message: 'Templates task complete', onLast: true }));
});

// Watch
gulp.task('watch', () => {

	// Watch .scss files
	gulp.watch('sass/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('js/**/*.js', ['scripts']);

	// Watch image files
	gulp.watch('img/**/*', ['images']);

	// Watch template files
	gulp.watch(['swig/**/*.swig'], ['templates']);

	// Create LiveReload server
	livereload.listen({ basePath: 'dist' });
});

// Build
gulp.task('build', ['styles', 'scripts', 'templates', 'images']);

gulp.task('default', ['build', 'webserver', 'watch']);
