const path = require('path');

module.exports = {
    entry: {
        home: './app/views/assets/home.ts',
        add: './app/views/assets/add.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'build', 'views', 'assets'),
    },
};
