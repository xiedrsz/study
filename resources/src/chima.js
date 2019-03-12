import _ from 'lodash'
import data from './chima.json'
const Limit = 2000
let num = _.mapValues(data, list => {
  return _.sum(_.map(list, ({m}) => +m))
})

let result = _.mapValues(data, (list, key) => {
  let len = key.match(/X/g) || []
  len = len.length
  // 非二字
  if (len !== 2) {
    return list
  }
  list = _.reduce(list, (res, item) => {
    let {f, m} = item
    let total = _.sum(_.map(res, ({f, m}) => f * m))
    let n
    if (Limit - f > total) {
      n = ~~((Limit - total) / f)
      m = m < n ? m : n
      _.assign(item, {
        m
      })
      res.push(item)
    }
    return res
  }, [])
  return list
})

num = _.mapValues(result, list => {
  return _.sum(_.map(list, ({m}) => +m))
})
console.log(num)
// console.log(result)
