module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname,
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'autoprefixer']
            },
        ]
    }
}
