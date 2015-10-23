'use strict'
var babel = require("babel")
//var code = babel.transform("import {isArraay as a} from 'util';console.log(a([]));var b = function(){};await b()",{}).code
var code = babel.transform("'use strict';async function(a){}",{}).code
//eval(code)
console.log(code)
