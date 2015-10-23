'use strict'
var gulp = require("gulp");
var babel = require("gulp-babel")
var moment = require("moment")
var _ = require("lodash")
var through = require('through2')


function wrap(stream){
	stream.on("error",function(error){
		console.log(error)
		serverLog(JSON.stringify(error))
		stream.end()
	})
	return stream
}

gulp.task("dist", function () {
	serverLog("dist")
	return gulp.src("src/**/*.js")
		.pipe(wrap(babel()))
	    .pipe(gulp.dest("dist"))
});


gulp.task("watch",function(){
	var watcher = gulp.watch("src/**/*.js")
	watcher.on('change',function(event){		
		serverLog(event.path)
		
		gulp.src(event.path)
			.pipe(wrap(babel()))
			.pipe(gulp.dest("dist"))
			.pipe(through.obj(function(file, enc, callback){
				var childProcess = require('child_process');
				var ls = childProcess.exec('node ' + file.path, function (error, stdout, stderr) {
				   if (error) {
				   		serverLog(JSON.stringify(error))
				   }else{
				   		serverLog(stdout)
				   }
				});
				callback()
			}))

	})
})

var io = require("socket.io")
var app = require('koa')();
app.use(require("koa-static")("./public",{}))
app.use(function* (){
	this.body = "404"
})
var server = require('http').createServer(app.callback());
var io = require('socket.io')(server);
io.on('connection', function(client){
	var len = logs.length - 1
	var start = len - 10
	if(start < 0){
		start = 0
	}
	while(start < len){
		start++
		client.emit("log",logs[start])
	}
});
var logs = []
var serverLog = function(){
	var log = [moment().format("YYYY-MM-DD HH:mm:ss")]
	_.each(arguments,function(item){
		log.push(item)
	})
	log = log.join(" ")
	logs.push(log)
	io.sockets.emit("log",log)
}
server.listen(3000)
gulp.task("default",["dist","watch"])
