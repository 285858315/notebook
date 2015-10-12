'use strict'
const util = require('util');
const EventEmitter = require('events')
function MyEventEmitter() {
  // Initialize necessary properties from `EventEmitter` in this instance
  EventEmitter.call(this);
}

// Inherit functions from `EventEmitter`'s prototype
util.inherits(MyEventEmitter, EventEmitter);

MyEventEmitter.prototype.test = function test(){
		
}

var c = [MyEventEmitter]

var a = new c[0]
a.on("newListener",function(){
	console.log("newListener",arguments)
})
a.on("removeListener",function(a,b){
	console.log("removeListener",arguments,b())
})



a.on("test",function(){
	console.log(arguments)
})
a.on("test",function(){
	console.log("b")
})

a.removeAllListeners("test",function(a){
	console.log(a)
})
a.emit("test","test")

