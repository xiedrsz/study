var Crawler = require("crawler");
var Url = require('url-parse');

var c = new Crawler({
  maxConnections: 10,
  callback: function (err, res, done) {
    if (err) {
      console.log(err)
    } else {
      var $ = res.$;
      var urls = $('a');
      var url, text
      urls = urls.each(function () {
        url = this.attribs.href;
        url = new Url(url, 'http://cn.morningstar.com/article/AR00008776');
        url = url.toString()
        text = (this.lastChild || {}).nodeValue;
        console.log(text + ': ' + url);
      })
    }
  }
});

c.queue('http://cn.morningstar.com/main/default.aspx');
