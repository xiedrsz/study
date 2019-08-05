import _ from 'lodash'
import printMe from './print'
function component (...args) {
  var element = document.createElement('div');
  element.innerHTML = _.join(args, ' ');
  return element;
}

document.body.appendChild(component(['Hello', 'webpack', 'server']));

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}
