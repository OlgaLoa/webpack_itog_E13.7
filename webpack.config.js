import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')  //создает HTML-файл на основе шаблона

/* global module */
module.exports = (env) => {
    const isDevelopment = env.development; //вводим переменную для определения среды разработки
    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: './src/index.js',
        output: {
            filename: 'main.js'
    },

    devServer: { // чтобы сервер webpack-dev-server знал, где искать файлы

            static: './dist',
            open: true,
            compress: true,
            hot: isDevelopment, //только для среды разработки будет действовать

    },

    plugins: [  new MiniCssExtractPlugin(),

                new HtmlWebpackPlugin({
                        title: 'webpack Boilerplate',
                        template: './src/index.html', // шаблон
                        filename: 'index.html', // название выходного файла, кот создастся в dist
                    }),
              ],
    module: {
        rules: [
          {
               use: [ //создаем объект
              {
                loader: MiniCssExtractPlugin.loader,  //свойство объекта
                options: { //объект для доп настроек
                  esModule: true,
                },
              },
              'css-loader',],

            test: /\.css$/   }
        ]
      }
    }
};