const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: ['.js'],
        alias:{
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@template': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    // aqui es donde se trabaja con loader  y se transforma en lo que necesita prodesar
    // test  identifica  el tipo de archivo  y use  indica  el loader para transformarlo
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.css|.styl$/i,
                use:[MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                test:/\.png/,
                type:'asset/resource'

            },
           {
            test: /\.(woff|woff2)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: "application/font-woff",
                name: "[name].[contenthash].[ext]",
                outputPath: "./assets/fonts/",
                publicPath: "../assets/fonts/",
                esModule: false,
              },
           }
        }
    ]
    },
    //aqui empieza los plugins
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[
                {
                from: path.resolve(__dirname, "src", "assets/images"),
                to:"assets/images"
                }
            ]
            }),
            new Dotenv(),
            ],
         

}