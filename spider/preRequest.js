var Crawler = require("crawler");

var c = new Crawler({
  preRequest: function (options, done) {
    // 'options' here is not the 'options' you pass to 'c.queue', instead, it's the options that is going to be passed to 'request' module 
    console.log(options);
    // when done is called, the request will start
    done();
  },
  callback: function (err, res, done) {
    if (err) {
      console.log(err)
    } else {
      console.log(res.statusCode)
    }
  }
});

c.queue({
  uri: 'https://www.baidu.com/',
  // this will override the 'preRequest' defined in crawler
  preRequest: function (options, done) {
    setTimeout(function () {
      console.log(options);
      done();
    }, 1000)
  }
});
