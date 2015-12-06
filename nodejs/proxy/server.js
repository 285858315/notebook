var httpProxy = require('http-proxy')
var http = require('http')
var fs = require("fs")
var moment = require("moment")

//---------------------
// http
//---------------------
var proxy = httpProxy.createProxyServer()
http.createServer(function (req, res) {
    console.log(moment().format("YYYY-MM-DD HH:mm:ss"),req.url)
    proxy.web(req, res, {
      target: "http://" + req.headers.host
    })
}).listen(80)
console.log("listening on port 80")


//---------------------
// https
//---------------------
var httpsProxy = httpProxy.createServer({
  ssl: {
    key: fs.readFileSync('privatekey.pem', 'utf8'),
    cert: fs.readFileSync('certificate.pem', 'utf8')
  },
  secure: true  
})
http.createServer(function (req, res) {
    console.log(moment().format("YYYY-MM-DD HH:mm:ss"),req.url)
    httpsProxy.web(req, res, {
      target: "https://" + req.headers.host
    })
}).listen(443)
console.log("listening on port 443")
