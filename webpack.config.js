const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.jsx', // Punto de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Limpia la carpeta dist
  },
  mode: 'development', // Modo desarrollo
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Archivos JS y JSX
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Archivos CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolver extensiones
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Archivo HTML base
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Carpeta estática
    port: 3000,
    open: true,
  },
};
