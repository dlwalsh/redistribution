/*eslint-env node */

var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './app/index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: 'dist'
    },
    module: {
        preLoaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    stage: '0'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'// inline base64 URLs for <=8k images, direct URLs for the rest
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
