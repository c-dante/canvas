'use strict';

var _ = require('lodash');
var del = require('del');
var file = require('gulp-file')
var glob = require('glob');
var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;

var config = require('./gulp.config');
var headerTag = '\'use strict\'; var out = ';
var footerTag = '; if (typeof define===\'function\'){define(function(require){return out;});}if (typeof module!==\'undefined\'){module.exports = out;}';

var getEnvConfig = function(baseEnv)
{
	delete require.cache[__dirname + '/' + config.files.envConfig];

	var envConfig = require('./' + config.files.envConfig);
	var envKey = _.get(argv, 'env', baseEnv);

	return _.merge(envConfig[baseEnv], envConfig[envKey]);
};

// Webpack for build and dev-server
var compiler = webpack(config.webpack);

gulp.task('config', function()
{
	var out = headerTag +
		JSON.stringify(getEnvConfig(config.baseEnvironment)) +
		footerTag;

	return file(config.files.outputConfig, out, { src: true })
		.pipe(gulp.dest(config.dirs.build + '/' + config.dirs.source));
});

gulp.task('js', ['config'], function()
{
	return gulp.src([config.dirs.app + '/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(gulp.dest(config.dirs.build));
});

gulp.task('test-files', function()
{
	var fileList = headerTag +
		JSON.stringify(glob.sync(config.dirs.test + '/**/*.spec.js')) +
		footerTag;

	return file(config.files.testSpecs, fileList, { src: true })
		.pipe(gulp.dest(config.dirs.test));
});

gulp.task('test-cli', ['js'], function()
{
	return gulp.src([config.dirs.test + '/**/*.spec.js'])
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('indicies', function(cb)
{
	return gulp.src([config.dirs.app + '/*.html'])
		.pipe(gulp.dest(config.dirs.build));
});

// @todo: support whatever I need for less
gulp.task('styles', function(cb)
{
	return gulp.src([config.dirs.app + '/**/*.{scss,css,less}'])
		.pipe(gulp.dest(config.dirs.build));
});

gulp.task('watch', function(cb)
{
	gulp.watch([config.dirs.app + '/**/*.js'], ['js']);
	gulp.watch([config.dirs.app + '/**/*.{scss,css,kess}'], ['styles']);
	gulp.watch([config.dirs.app + '/*.html'], ['indicies']);
	cb();
});

gulp.task('serve', ['build', 'watch', 'compile-static'], function(cb)
{
	new WebpackDevServer(compiler, config.webpackServer)
	.listen(config.serve.port, config.serve.hostname, function(err)
	{
		if (err)
		{
			console.log('[webpack-dev-server]:', err);
		}

		cb();
	});
});

gulp.task('clean', function(cb)
{
	return del([
		config.dirs.build + '/**/*',
		config.dirs.output + '/**/*'
	], cb);
});

gulp.task('compile-static', ['build'], function(cb)
{
	return gulp.src(config.statics)
		.pipe(gulp.dest(config.dirs.output));
});

gulp.task('compile', ['compile-static'], function(cb)
{
	compiler.run(function(err, stats)
	{
		if (err)
		{
			console.log(err);
		}
		console.log(stats);
		cb();
	});
});

gulp.task('build', function(cb)
{
	return runSequence('clean', ['js', 'indicies', 'styles'], cb);
});

gulp.task('default', function(cb)
{
	return runSequence('build', 'watch', cb);
});
