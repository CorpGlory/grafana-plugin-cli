const webpack = require('webpack');
const path = require('path');


module.exports = {
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },

      {
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          plugins: ['syntax-dynamic-import'],
          presets: [
            [
              'env',
              {
                modules: false
              }
            ]
          ]
        },
        test: /\.js$/
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve('dist')
  },
  
  entry: './src/index.ts',


  
};
