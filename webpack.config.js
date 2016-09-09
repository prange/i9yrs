const webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist',
        filename: 'app.bundle.js',
    },
    devServer: {inline: true},
    module: {
        loaders: [
            /*Loader for js using babel*/
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            /*Loader for json files*/
            {
                test: /\.json$/,
                loader: 'json',
            },
            /*Loader for css*/
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            /*Loader for images*/
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            /*loaders for bootstrap fonts*/
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },
    node: {
        net: "empty",
        tls: "empty",
        fs: "empty"
    }/*,
     plugins: [
     new webpack.optimize.UglifyJsPlugin({
     compress: {
     warnings: false,
     },
     output: {
     comments: false,
     },
     }),
     ]*/
}