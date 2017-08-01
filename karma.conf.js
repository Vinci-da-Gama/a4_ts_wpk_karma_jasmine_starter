require('phantomjs-polyfill');
var nPath = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			'./node_modules/phantomjs-polyfill/bind-polyfill.js',
			{ pattern: './src/main-spec.ts', watched: false }
		],
		preprocessors: {
			'./src/*.html': ['ng-html2js'],
			'./src/main-spec.ts': ['webpack', 'coverage']
		},
		//////////////////////////////
		// generate karma coverage  //
		//////////////////////////////
		reporters: ['progress', 'coverage'],
		// add coverageReporter
		coverageReporter: {
			type: 'html',
			dir: './coverage/'
		},
		webpack: {
			module: {
				loaders: [
					{
						test: /\.component.tsx?$/,
						exclude: /node_modules/,
						loader: 'ts-loader!angular2-template-loader'
					},
					{
						test: /\.tsx?$/,
						exclude: /\.component.ts$/,
						loader: 'ts-loader'
					},
					{
						test: /\.html$/,
						exclude: /node_modules/,
						loader: 'raw-loader'
					},
					{
						// this is for main.ts import bootstrap.css
						test: /\.css$/,
						exclude: nPath.resolve('src/app'),
						loader: ExtractTextPlugin.extract('css-loader')
					},
					{
						// this will load bootstrap fonts
						test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
						exclude: nPath.resolve('./src'),
						loader: 'file-loader?name=fonts/[name].[ext]'
					},
					{
						test: /\.less/,
						exclude: /node_modules/,
						loader: 'raw-loader!less-loader?sourceMap'
					},
					{
						test: /\.scss$/,
						exclude: /node_modules/,
						loader: 'raw-loader!sass-loader?sourceMap'
					}
				]
			},
			resolve: {
				extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.scss', '.less']
			}
		},
		webpackMiddleware: {
			stats: 'erros-only'
		},
		browserNoActivityTimeout: 100000,
		browserDisconnectTolerance: 3,
		retryLimit: 3,
		/* 'PhantomJS',  */
		browsers: ['PhantomJS_custom', 'Safari'],
		customLaunchers: {
			'PhantomJS_custom': {
				base: 'PhantomJS',
				options: {
					windowName: 'PhantomJS-Window',
					settings: {
						webSecurityEnabled: true
					},
				},
				flags: ['--load-images=true'],
				debug: true
			}
		},
		phantomjsLauncher: {
			exitOnResourceError: true
		},
		singleRun: false,
		concurrency: Infinity
	});
};