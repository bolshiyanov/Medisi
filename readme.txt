Это шаблон webpack 5

Dependencies:

webpack
webpack - Module and asset bundler.
webpack-cli - Command line interface for webpack
webpack-dev-server - Development server for webpack
webpack-merge - Simplify development/production configuration
cross-env - Cross platform configuration
copy-webpack-plugin - Copies individual files or entire directories, which already exist, to the build directory

Babel 
@babel/core - Transpile ES6+ to backwards compatible JavaScript
@babel/plugin-proposal-class-properties - Use properties directly on a class (an example Babel config)
@babel/preset-env - Smart defaults for Babel
@babel/polyfill - for Runtime Promise or WeakMap

Loaders
babel-loader - Transpile files with Babel and webpack
sass-loader - Load SCSS and compile to CSS
node-sass - Node Sass
postcss-loader - Process CSS with PostCSS
postcss-preset-env - Sensible defaults for PostCSS 
css-loader - Resolve CSS imports
style-loader - Inject CSS into the DOM

Plugins
clean-webpack-plugin - Remove/clean build folders
copy-webpack-plugin - Copy files to build directory
html-webpack-plugin - Generate HTML files from template
mini-css-extract-plugin - Extract CSS into separate files
css-minimizer-webpack-plugin - Optimize and minimize CSS assets

Linters
eslint - Enforce styleguide across application
eslint-loader - 
eslint-config-google - 

asset modules
resource - ico|gif|png|jpg|jpeg loader
inline - woff|eot|ttf|otf|svg loader


!!!При необходимости установите http-server глобально.)

!!!Если вы переходите с webpack 4 на webpack 5, вот несколько примечаний:
команда webpack-dev-server теперь является загрузчиком файлов webpack-serve
, raw-loader и url-loader не нужны, вы можете использовать
встроенные модули активов
Полифиллы узлов больше не доступны, поэтому, если вы получите ошибку для stream,
например, вы добавите пакет stream-browserify в качестве зависимости и
добавите { stream: 'stream-browserify' } в свойство alias в конфигурации webpack.

!!! Горячая перезагрузка dev сервера работает