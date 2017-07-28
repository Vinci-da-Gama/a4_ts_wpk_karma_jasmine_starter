var nPath = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    module: {
        loaders: 
        [
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
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'raw-loader!sass-loader?sourceMap'
            }
        ]
    }
}
