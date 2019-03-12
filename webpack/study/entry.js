// require("./stylkke.css") // 载入 style.css
// document.write('It works.')
// document.write(require('./module.js'))
// console.log("I had changed!!")
// console.log("I had changed to use webpack-dev-server!!")

import Vue from 'Vue'
import Favlist from './components/Favlist'

new Vue({
  el: 'body',
  components: {
    Favlist
  }
})
