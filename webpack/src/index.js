import _ from 'lodash'
function component (...args) {
  var element = document.createElement('div');
  element.innerHTML = _.join(args, ' ');
  return element;
}

document.body.appendChild(component(['Hello', 'webpack']));
