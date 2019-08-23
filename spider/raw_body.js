var Crawler = require("crawler");
var fs = require('fs');

var c = new Crawler({
  encoding: null,
  jQuery: false,// set false to suppress warning message.
  callback: function (err, res, done) {
    if (err) {
      console.error(err.stack);
    } else {
      fs.createWriteStream(res.options.filename).write(res.body);
    }

    done();
  }
});

c.queue({
  uri: "https://www.baidu.com/img/bd_logo1.png",
  filename: "bd_logo1.png"
});
