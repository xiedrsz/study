// #!/usr/bin/env node

var brain = require("brain");

var net = new brain.NeuralNetwork();

net.train([
  {
    input: [1, 1],
    output: [0]
},
  {
    input: [1, 2],
    output: [3]
},
  {
    input: [1, 3],
    output: [2]
},
  {
    input: [1, 4],
    output: [5]
},
  {
    input: [1, 5],
    output: [4]
},
  {
    input: [1, 6],
    output: [7]
},
  {
    input: [1, 7],
    output: [6]
},
  {
    input: [1, 8],
    output: [9]
},
  {
    input: [1, 9],
    output: [8]
},
  {
    input: [2, 1],
    output: [3]
},
  {
    input: [2, 2],
    output: [0]
},
  {
    input: [2, 3],
    output: [1]
},
  {
    input: [2, 4],
    output: [6]
},
  {
    input: [2, 5],
    output: [7]
},
  {
    input: [2, 6],
    output: [4]
},
  {
    input: [2, 7],
    output: [5]
},
  {
    input: [2, 8],
    output: [10]
},
  {
    input: [2, 9],
    output: [11]
},
  {
    input: [3, 1],
    output: [2]
},
  {
    input: [3, 2],
    output: [1]
},
  {
    input: [3, 3],
    output: [0]
},
  {
    input: [3, 4],
    output: [7]
},
  {
    input: [3, 5],
    output: [6]
},
  {
    input: [3, 6],
    output: [5]
},
  {
    input: [3, 7],
    output: [4]
},
  {
    input: [3, 8],
    output: [11]
},
  {
    input: [3, 9],
    output: [10]
},
  {
    input: [4, 1],
    output: [5]
},
  {
    input: [4, 2],
    output: [6]
},
  {
    input: [4, 3],
    output: [7]
},
  {
    input: [4, 4],
    output: [0]
},
  {
    input: [4, 5],
    output: [1]
},
  {
    input: [4, 6],
    output: [2]
},
  {
    input: [4, 7],
    output: [3]
},
  {
    input: [4, 8],
    output: [12]
},
  {
    input: [4, 9],
    output: [13]
},
  {
    input: [5, 1],
    output: [4]
},
  {
    input: [5, 2],
    output: [7]
},
  {
    input: [5, 3],
    output: [6]
},
  {
    input: [5, 4],
    output: [1]
},
  {
    input: [5, 5],
    output: [0]
},
  {
    input: [5, 6],
    output: [3]
},
  {
    input: [5, 7],
    output: [2]
},
  {
    input: [5, 8],
    output: [13]
},
  {
    input: [5, 9],
    output: [12]
},
  {
    input: [6, 1],
    output: [7]
},
  {
    input: [6, 2],
    output: [4]
},
  {
    input: [6, 3],
    output: [5]
},
  {
    input: [6, 4],
    output: [2]
},
  {
    input: [6, 5],
    output: [3]
},
  {
    input: [6, 6],
    output: [0]
},
  {
    input: [6, 7],
    output: [1]
},
  {
    input: [6, 8],
    output: [14]
},
  {
    input: [6, 9],
    output: [15]
},
  {
    input: [7, 1],
    output: [6]
},
  {
    input: [7, 2],
    output: [5]
},
  {
    input: [7, 3],
    output: [4]
},
  {
    input: [7, 4],
    output: [3]
},
  {
    input: [7, 5],
    output: [2]
},
  {
    input: [7, 6],
    output: [1]
},
  {
    input: [7, 7],
    output: [0]
},
  {
    input: [7, 8],
    output: [15]
},
  {
    input: [7, 9],
    output: [14]
},
  {
    input: [8, 1],
    output: [9]
},
  {
    input: [8, 2],
    output: [10]
},
  {
    input: [8, 3],
    output: [11]
},
  {
    input: [8, 4],
    output: [12]
},
  {
    input: [8, 5],
    output: [13]
},
  {
    input: [8, 6],
    output: [14]
},
  {
    input: [8, 7],
    output: [15]
},
  {
    input: [8, 8],
    output: [0]
},
  {
    input: [8, 9],
    output: [1]
},
  {
    input: [9, 1],
    output: [8]
},
  {
    input: [9, 2],
    output: [11]
},
  {
    input: [9, 3],
    output: [10]
},
  {
    input: [9, 4],
    output: [13]
},
  {
    input: [9, 5],
    output: [12]
},
  {
    input: [9, 6],
    output: [15]
},
  {
    input: [9, 7],
    output: [14]
},
  {
    input: [9, 8],
    output: [1]
},
  {
    input: [9, 9],
    output: [0]
}
], {
  errorThresh: 0.005, // error threshold to reach
  iterations: 20000, // maximum training iterations
  log: true, // console.log() progress periodically
  logPeriod: 10, // number of iterations between logging
  learningRate: 0.03 // learning rate
});

var output = net.run([2, 1]); // [0.987]

console.log(output)