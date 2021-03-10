const path = require('path');
const env = require('yargs').argv.env;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pkg = require('./package.json');
let libraryName = pkg.name;
let outputFile, outputPath, mode, entryFile;

entryFile = '/src/index.js';
outputPath = '/dist';
outputFile = '[name].bundle.js';

if (env === 'build') {
    mode = 'production';
    outputPath = '/lib';
    entryFile = '/src/index.js';
    outputFile = libraryName + '.min.js';
} else if (env === 'dev') {
    mode = 'development';
    outputPath = '/lib';
    entryFile = '/src/index.js';
    outputFile = libraryName + '.js';
} else if (env === 'module_build') {
    mode = 'development';
    outputPath = '/lib'
    entryFile = '/src/recognizer/index.js';
    outputFile = 'index.js';
}

module.exports = {
    mode: mode,
    // entry: {
    //     app: './src/index.js'
    // },
    entry: __dirname + entryFile,
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hot Module Replacement',
        }),
    ],
    output: {
        // filename: '[name].bundle.js',
        // path: path.resolve(__dirname, 'dist'),
        path: __dirname + outputPath,
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js']
    }
};