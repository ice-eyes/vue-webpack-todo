const autoprefixer = require('autoprefixer')

/**
 * postcss 在css编译完成以后，再进行处理
 * @type {{plugins: *[]}}
 */
module.exports = {
    plugins: [
        autoprefixer()//自动对需要进行处理的css代码加上前缀，比如针对某些特定浏览器的css
    ]
}