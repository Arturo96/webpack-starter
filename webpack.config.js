const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    module: {
        rules: [
            {
				test: /\.(sa|sc|c)ss$/,
				use: [
				  {
					loader: MiniCssExtractPlugin.loader,
					options: {
					  hmr: process.env.NODE_ENV === 'development',
					},
				  },
				  'css-loader',
				  'sass-loader',
				],
			  },
            {
				test: /\.html$/,
				loader: "html-loader",
				options: {
					attributes: false,
					minimize: false
				}
            },
            {
				test: /\.(png|gif|svg|jpg)$/,
				use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
			}
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin([
            {from: 'src/assets', to: 'assets/'}
        ]),
        new MinifyPlugin()
        
    ]

}

