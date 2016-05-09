module.exports = {
    entry: {
        index:"./src/entrys/index.js",
        searchresult:'./src/entrys/searchresult.js',
        program_detail: "./src/entrys/program_detail_entry.js",
    },
    output: {
        path: "./dist/",
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
