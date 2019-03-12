var utils = require('./utils.js')

var server = {
  host: '10.6.99.101',
  port: 22,
  username: 'root',
  password: 'qOoxhNzjxG@20171222'
}

// 执行命令
/*utils.Shell(server, 'pwd\n', function (res) {
  console.log(res)
}, true)*/

// 上传文件
/*utils.UploadFile(server, './utils.js', '/root/utils.js', function (err, res) {
  console.log('Error: ' + err)
  console.log(res)
})*/

// 下载文件
/*utils.DownloadFile(server, '/root/my.log', './my.log', function (err, res) {
  console.log('Error: ' + err)
  console.log(res)
})*/

utils.UploadFile(server, './dist.zip', '/software/workspace/jiulong-web/apache-tomcat-8.5.27/webapps/ROOT/dist.zip', function (err, res) {
  if (err) throw err;
  console.log('OK')
  utils.Shell(server, 'cd /software/workspace/jiulong-web/apache-tomcat-8.5.27/webapps/ROOT/ && rm -rf static/ && unzip -o dist.zip && rm -f dist.zip && logout\n', function (err, res) {
    console.log('Error: ' + err)
    console.log(res)
  })
})
