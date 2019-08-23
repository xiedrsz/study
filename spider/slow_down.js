var Crawler = require("crawler");

var c = new Crawler({
  rateLimit: 1000, // `maxConnections` will be forced to 1
  callback: function (err, res, done) {
    console.log(res.$("title").text());
    done();
  }
});

// between two tasks, minimum time gap is 1000 (ms)
c.queue(['http://www.amazon.com', 'http://www.yahoo.com']);
