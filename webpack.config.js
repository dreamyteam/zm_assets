var webpack = require('webpack');

module.exports = {
    entry: {
        index: "./src/entrys/index.js",
        searchresult: './src/entrys/searchresult.js',
        program_detail: "./src/entrys/program_detail_entry.js",
        user:"./src/entrys/user.js"
        // vendor: ['jquery','echarts'] //第三方库
    },
    output: {
        path: "./dist/",
        filename: '[name].js'
    },
    pluginds: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            echarts:'echarts'
        }),
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
