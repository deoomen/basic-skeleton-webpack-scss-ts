const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    const config = {
        context: path.join(__dirname, 'resources'),
        entry: {
            main: './main.ts',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    include: path.resolve(__dirname, 'resources/js'),
                },
                {
                    test: /\.scss$/,
                    include: path.resolve(__dirname, 'resources/scss'),
                    loader: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: isDevelopment
                            }
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment,
                                sassOptions: {
                                    outputStyle: isDevelopment ? 'nested' : 'compressed'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.scss', '.ts']
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[id].css'
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendors: false,

                    // vendor chunk
                    vendor: {
                        // name of the chunk
                        name: 'vendor',

                        // async + async chunks
                        chunks: 'all',

                        // import file path containing node_modules
                        test: /node_modules/,

                        // priority
                        priority: 20
                    },

                    // common chunk
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            }
        }
    };

    if (isDevelopment) {
        config.devtool = 'source-map';
    } else {
        config.optimization = {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        };
    }

    return config;
}
