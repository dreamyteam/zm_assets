module.exports = {
    entry: {
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
