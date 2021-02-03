const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BabelRules = {
    test: /\.(js)$/,
    use: ['babel-loader'],
    exclude: /node_modules/,
}

const CSSRules = {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    optimization: {
        minimize: false,
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [BabelRules, CSSRules],
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
}
