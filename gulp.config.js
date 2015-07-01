var dirs = {
	test: 'test',
	app: 'app',
	source: 'src',
	build: 'build',
	output: 'bin',
	// less: 'app/styles',
	styles: 'app/styles',
	assets: 'app/assets',
	nodeModule: 'node_modules'
};

var files = {
	// Entry file relative to dirs.app (webpack)
	entry: './entry',
	// Location of environment config (gulp)
	envConfig: 'env.config',
	// Output file for environment configuration (gulp)
	outputConfig: 'config.js',
	// Output file for globbed test specs
	testSpecs: 'specFiles.js',
	// Output bundle name (webpack)
	bundle: '[name].bundle.js'
};

// An array of globs to copy for compile-static
var statics = [
	dirs.build + '/index.html'
];

// @see: http://webpack.github.io/docs/configuration.html
var webpack = {
	context: __dirname + '/' + dirs.build,
	entry: files.entry,
	output: {
		path: __dirname + '/' + dirs.output,
		filename: files.bundle
	},
	resolveLoader: {
		root: __dirname + '/' + dirs.nodeModule
	}
};

// @see: http://webpack.github.io/docs/webpack-dev-server.html
var webpackServer = {
	// Mount point for the server
	contentBase: dirs.output
};

// Server options for hosting during dev
var serve = {
	port: 9000,
	hostname: 'localhost'
};

var out = {
	dirs: dirs,
	files: files,
	serve: serve,
	statics: statics,
	webpack: webpack,
	webpackServer: webpackServer
};

if (typeof define==='function'){define(function(require){return out;});}if (typeof module!=='undefined'){module.exports = out;}
