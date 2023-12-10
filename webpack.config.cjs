const path = require('path')

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vid-chat-lang.bundle.js',
    },
    module: {
        rules: [{ test: /\.tsx?$/, use: 'ts-loader' }],
    },
    resolve: {
        extensions: [".ts", ".tsx"]
    }
}