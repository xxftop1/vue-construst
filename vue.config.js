
const path = require('path');
const webpack = require('webpack');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    configureWebpack:{
         resolve:{
            alias: {
                "assets":resolve("src/assets"),
                "components":resolve("src/components"),
                "views":resolve("src/views"),
                "utils":resolve("src/utils")
            }
        }
    }
}