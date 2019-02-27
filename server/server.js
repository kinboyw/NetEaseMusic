var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
var qiniu = require('qiniu')

if(!port){
  console.log('请指定端口，例如：node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');
	if ( request.method === 'OPTIONS' ) {
		response.writeHead(200);
		response.end();
		return;
	}
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('HTTP 路径为\n' + path)
  if(path == '/uptoken'){
    //文档：https://developer.qiniu.com/kodo/sdk/1289/nodejs#upload-token
    var config = fs.readFileSync('./qiniu-config.json','utf8')
    console.log(config)
    config = JSON.parse(config)

    console.log(config)
    let {accessKey,secretKey} = config
    console.log('accessKey: '+accessKey)
    console.log('secretKey: '+secretKey)

    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
      scope: '163music',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    console.log(uploadToken)

    response.write(`
    {
     "uptoken":"${uploadToken}"
    }
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
