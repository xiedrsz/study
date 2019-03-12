var NLP = require('stanford-corenlp');

var coreNLP = new NLP.StanfordNLP({
  "nlpPath": "./corenlp",
  "version": "3.4"
}, function(err) {
  coreNLP.process('This is so good.', function(err, result) {
    console.log(err, JSON.stringify(result));
  });
});