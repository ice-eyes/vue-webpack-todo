import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root =document.createElement('div')
document.body.appendChild(root)

/**
 * =>箭头函数
 * render: function(h){
 *      reutrn h(App);
 * }
 */
new Vue({
    render: h => h(App)
}).$mount(root)