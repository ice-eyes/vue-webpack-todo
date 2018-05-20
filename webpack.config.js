const path = require('path')
const HTMLplugin = require('html-webpack-plugin')
const webpack = require('webpack')

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    /**
     * 输入文件(入口)
     */
    entry: path.join(__dirname, '/src/index.js'),
    /**
     * 输出文件(出口)
     */
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    /**
     * 协助webpack进行处理的工具
     */
    module: {
        /**
         * 处理规则数组
         */
        rules: [
            {
                test: /\.vue$/,
                //处理vue文件
                loader: 'vue-loader'
            },
            {
                test: /\.jsx/,
                //处理jsx文件
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)/,
                use: [
                    {
                        /**
                         * file-loader的一个扩展，用于将图片文件转成base64，直接存在于代码中，而不需要再请求一个文件
                         */
                        loader: 'url-loader',
                        options: {
                            limit: 1024,//1024KB以内的图片会被转为base64编码
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLplugin()
    ]
}

if (isDev) {
    /**
     * 开发时在浏览器中看到的代码是正常的代码，不是es6的语法，调试会比较方便
     * @type {string}
     */
    config.module.rules.push(/**
         * 处理stylus文件，stylus用来编写css样式
         */
        {
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true//对于已生成的sourceMap，直接拿来使用
                    }
                },
                'stylus-loader'//处理完后变成css代码
            ]
        })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',//既能localhost访问，也能用内网地址访问
        overlay: {
            errors: true//在控制台输出错误信息
        },
        // open: true
        /*historyFallback: {

        }*/
        hot: true//局部刷新，只重新加载修改过的模块，不会刷新整个页面，避免丢失掉操作过的数据，提高开发效率
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, '/src/index.js'),
        //列出所使用的框架，以便打包时将业务代码与框架代码分离出来
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(/**
         * 处理stylus文件，stylus用来编写css样式
         */
        {
            test: /\.styl$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true//对于已生成的sourceMap，直接拿来使用
                    }
                },
                'stylus-loader'//处理完后变成css代码
            ]
        })
    //生产环境中，将js中的的style代码单独抽取出来，生成单独的css文件
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        })
    )
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',// "initial" | "all" | "async"(默认值)
                    minChunks: 2,// 最小chunk ，默认值为1
                    maxInitialRequests: 5,// 最大初始化请求数，默认值为1
                    minSize: 0//最小大小，默认值为0
                },
                vendor: {
                    test: /node_modules/,// 正则规则验证，如果符合就提取 chunk
                    chunks: 'initial',
                    name: 'vendor',// 要缓存的 分隔出来的 chunk 名称
                    priority: 10,// 缓存组优先级
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    }
}

module.exports = config