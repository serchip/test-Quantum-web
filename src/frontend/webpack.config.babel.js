const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: ['./main.js', './main.scss']
    },
    module: {
         rules: [
                  {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react",
                        ],
                        plugins: ["@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-modules-commonjs",
                            "@babel/plugin-proposal-class-properties"
                        ]
                        }
                  },
                  {
                    test: /\.scss$/,
                    use:  [  'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        //'sass-loader'
                        {
                        loader: 'sass-loader',
                         options: {
                          sassOptions: {
                            includePaths: [path.resolve(__dirname, 'node_modules/compass-mixins/lib')]
                          }
                        },
                        },
                    ],
                  },
                   {
                    test: /\.css$/,
                    use:  [  'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                  }
                ],
        },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        // path: `${__dirname}/build`,
        publicPath: '/',
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css',}),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `./index.html`,
            hash: true,
        })
    ],
    devServer: {
        host: '0.0.0.0'
  }
};
