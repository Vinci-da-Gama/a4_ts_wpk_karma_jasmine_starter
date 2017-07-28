var wpk = require('webpack');
var nPath = require('path');
var HtmlWpkPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WriteFilePlugin = require("write-file-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var wpkMerge = require('webpack-merge');
var CompressionPlugin = require('compression-webpack-plugin');

var pathsToClean = [
  'dist',
  'build'
]

// the clean options to use
var cleanOptions = {
  root:     '/full/webpack/root/path',
  exclude:  ['shared.js'],
  verbose:  true,
  dry:      false
}

var srcApp = './src/', distApp = 'dist/';

var npmLifecycle = process.env.npm_lifecycle_event;
console.log('26 -- npmLifecycle (package.json each scripts name) is: ', npmLifecycle);

var commonConfig = {
    devtool: 'eval-source-map',
    entry: {
        'a4starterApp': [srcApp+'main.ts'],
        'polyfills': [
            'core-js/es6/reflect',
            'core-js/es7/reflect',
            'zone.js/dist/zone'
        ]
    },
    output: {
        // path: __dirname,
        path: nPath.resolve(__dirname, distApp),
        // specifies the public URL address of the output files.
        // remember in express pj, there is a public folder -- 
        // in here, we set ./dist as that public folder
        // publicPath: ./dist,
        /*publicPath: '/',*/
        // publicPath: 'http://localhost:8080/dist/',
        /*once you use webpack-dev-server, it will keep bundle.js in memery
        so it is not generate bundle.js files into your disk*/
        filename: 'js/[name]_[hash].js',
        pathinfo: true
    },
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
                test: /\.css$/,
                include: nPath.resolve('src/app'),
                loader: 'raw-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.scss', '.less']
    },
    plugins: [
        // below plugin will provide context to Angular's use of System.import.
        // Then, the system will not throw this error --- 
        // Critical dependency: the request of a dependency is an expression
        new wpk.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            nPath.resolve(__dirname, 'src')
        ),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new CopyWebpackPlugin([
            // to is actually {outputDir}/{to}/ --> so when you use image in html, use like ./imgs/sth.png
            {from: srcApp+'images', to: 'imgs'}
        ]),
        new HtmlWpkPlugin({
            template: srcApp+'index.html',
            filename: './index.html',
            minify: {
                // reference see here --> https://github.com/kangax/html-minifier#options-quick-reference
                caseSensitive: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeEmptyElements: true
            },
            hash: true
        }),
        new wpk.DefinePlugin({
            app: {
                environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
            }
        }),
        new wpk.optimize.CommonsChunkPlugin({
            name: 'polyfills',
            children: true,
            async: true
        }),
        new ExtractTextPlugin('mincss/[name].css'),
        new UglifyJSPlugin({
            sourceMap: true,
            mangle: {
                // Skip mangling these
                except: ['$super', '$', 'exports', 'require']
            }
            // output: {
            //     comments: false
            // }
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 9728,
            minRatio: 0.8
        })
    ]
};

var wpkConfig;

// Detect how npm is run and branch based on that
switch(npmLifecycle) {
    case 'wpkservesass':
        // you can have more than 2 mudules to be merged. 
        var sassConfig = require('./wpk_configs/config_scss');
        wpkConfig = wpkMerge(commonConfig, sassConfig);
        break;
    case 'wpkserveless':
        var lessConfig = require('./wpk_configs/config_less');
        wpkConfig = wpkMerge(commonConfig, lessConfig);
        break;
    case 'build:prod':
        // basically, use sass, you can add more modules or functions later.
        var sassConfig = require('./wpk_configs/config_scss');
        wpkConfig = wpkMerge(commonConfig, sassConfig);
        break;
    default:
        wpkConfig = wpkMerge(commonConfig, {});
}

module.exports = wpkConfig;