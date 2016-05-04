import _debug from 'debug';
import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { environConfig, ENV } from './config';

const debug = _debug('app:webpack');
const { __DEV__, __PROD__, __TEST__ } = environConfig;

// Check to make sure we are in the right environments
debug(`Reading Webpack Configuration.
  Make sure you want to be in the ${ENV.toUpperCase()} environment
  __PROD__: ${__PROD__}, __DEV__: ${__DEV__}, __TEST__: ${__TEST__}`);

// ----------------------------------
// Project Structure
// ----------------------------------
const dirConfig = {
  // Input Paths
  entryPath: path.resolve(__dirname, 'src'),
  entryJS: path.join(__dirname, 'src/index'),
  entryHTML: path.join(__dirname, 'src/index.html'),
  entryFavicon: path.join(__dirname, 'src/static/favicon.ico'),

  // Add files that don't change often (thus can be cached)
  vendorList: [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux',
  ],

  // Output Paths
  outputPath: path.join(__dirname, 'public'),
  outputJS: './js/[name].[chunkhash].js',
  outputCommonJS: './js/[name].bundle.js',
  outputCSS: './css/[name].[contenthash].css',
  outputHTML: 'index.html',
  outputImg: './img/[name].[hash].[ext]',
  publicDir: '/',

  // Util Paths
  excludeDir: '/node_modules/',
};

// ------------------------------------
// Initial Setup
// ------------------------------------
const webpackConfig = {
  devtool: __DEV__ ?
    // 'cheap-module-eval-source-map'
    'eval' :
    'cheap-module-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: [
      // Disabled resolve.root temporarily. Could be editor issue
      // See https://github.com/benmosher/eslint-plugin-import
      // dirConfig.entryPath,
    ],
  },

  module: {},
};

// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfig.entry = {
  app: __DEV__ ?
    [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      dirConfig.entryJS,
    ] :
    [
      dirConfig.entryJS,
    ],
  vendor: dirConfig.vendorList,
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  path: dirConfig.outputPath,
  filename: dirConfig.outputJS,
  publicPath: dirConfig.publicDir,
};

// ------------------------------------
// Plugins
// ------------------------------------
debug('Enable DefinePlugin to expose environment varaibles.');
debug('Enable HtmlWebpackPlugin to automatically generate HTML files.');
webpackConfig.plugins = [
  new webpack.DefinePlugin(environConfig),
  new HtmlWebpackPlugin({
    template: dirConfig.entryHTML,
    hash: false,
    favicon: dirConfig.entryFavicon,
    filename: dirConfig.outputHTML,
    inject: 'body',
    minify: {
      collapseWhitespace: false,
    },
  }),
];

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  );
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe, UglifyJS, ExtractText).');
  webpackConfig.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        unused: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin(dirConfig.outputCSS, {
      allChunks: true,
    }),
  );
}

// We need one bundle for testing
if (!__TEST__) {
  debug('Split bundles so a shared bundle can be cached');
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      filename: dirConfig.outputCommonJS,
      minChunks: Infinity,
    })
  );
}

// ------------------------------------
// Style Configuration
// ------------------------------------
const loadCSSLoaders = () => {
  const styleLoader = 'style?sourceMap';
  const cssLoader = `css?modules&importLoaders=1
  &localIdentName=[path]___[name]__[local]___[hash:base64:5]`;

  const defaultConfig = {
    test: /\.css$/,
    include: dirConfig.entryPath,
  };

  if (!__DEV__) {
    debug('Extract CSS code from JS files.');
    defaultConfig.loader = ExtractTextPlugin.extract(styleLoader, cssLoader);
  } else {
    debug('All styles will be inside JS files.');
    defaultConfig.loaders = [styleLoader, cssLoader];
  }

  return defaultConfig;
};

// ------------------------------------
// Javascript and CSS Loaders
// ------------------------------------
// JS, JSX, CSS
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel',
    exclude: dirConfig.excludeDir,
    include: dirConfig.entryPath,
    query: {
      cacheDirectory: true,
    },
  },
  loadCSSLoaders(),
];

// ------------------------------------
// File Loaders
// ------------------------------------
/* eslint-disable */
webpackConfig.module.loaders.push(
  // inline base64 URLs for <=8k images, direct URLs for the rest
  { test: /\.(png|jpg)$/, loader: `url-loader?limit=8192/&name=${dirConfig.outputImg}` },
);
/* eslint-enable */

export default webpackConfig;
