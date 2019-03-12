/**
 * @Description 盈利策略研究
 *  研究是否吃码模型
 *  计算盈利
 */
import _ from 'lodash'
import data from './statistics.json'

// =========================== 统计 ===============================
const Total = data.length
const AveCoverage = getAverage(data, 'coverage')
const AveWin = getAverage(data, 'win')
let temp
temp = _.filter(data, ({income}) => {
  return income < 0
})
const LossCoverage = getAverage(temp, 'coverage')
const LossWin = getAverage(temp, 'win')
let sum = _.sum(_.map(data, 'income'))
// log
console.log(`总期数：${Total}期`)
console.log(`平均中奖概率：${AveCoverage.toFixed(2)}%`)
console.log(`平均盈利概率：${AveWin.toFixed(2)}%`)
console.log(`亏损平均中奖概率：${LossCoverage.toFixed(2)}%`)
console.log(`亏损平均盈利概率：${LossWin.toFixed(2)}%`)
console.log(`全吃盈利: ${sum}元`)

// ========================== 挑吃模型 ==========================
temp = _.filter(data, item => {
  let {coverage, win, income} = item
  // 盈利概率低于亏损平均
  if (win < LossWin) {
    return false
  }
  // 中奖概率高于亏损平局，盈利概率低于平均
  if (coverage > LossCoverage && win < AveWin) {
    return false
  }
  return true
})
let tmpLen = temp.length

temp = _.filter(temp, ({income}) => {
  return income > 0
})
let len = temp.length

sum = _.sum(_.map(temp, 'income'))
// log
console.log(`总吃期数：${tmpLen}期`)
console.log(`准确率: ${(len / tmpLen * 100).toFixed(2)}%`)
console.log(`现盈利: ${sum}元`)

// ============================= util ===========================
/**
 * @Function 获取平均值
 * @Param array 数组
 * @Param 字段名
 */
function getAverage (array, label) {
  let total = array.length
  return _.sum(_.map(array, label)) / total
}
