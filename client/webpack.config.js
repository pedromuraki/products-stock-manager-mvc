const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/js/app.js'],
  output: {
    filename: 'js/main.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader:
              process.env.NODE_ENV !== 'production'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader?url=false',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => {
                return [
                  require('postcss-flexbugs-fixes'),
                  require('autoprefixer')({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9',
                    ],
                    flexbox: 'no-2009',
                  }),
                ];
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(mp4)$/,
        loader: 'file-loader',
        options: {
          name:
            process.env.NODE_ENV !== 'production'
              ? false
              : '/video/[name].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name:
            process.env.NODE_ENV !== 'production' ? false : '/img/[name].[ext]',
        },
      },
      {
        test: /\.(png)$/,
        loader: 'image-webpack-loader',
        enforce: 'pre',
        options: {
          optipng: {
            enabled: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  devtool: 'source-map',
};
