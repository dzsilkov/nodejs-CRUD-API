import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Configuration } from 'webpack';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: Configuration = {
    entry: resolve(__dirname, 'src', 'index.ts'),
    mode: 'production',
    target: 'node',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    },
    plugins: [],
};

export default config;