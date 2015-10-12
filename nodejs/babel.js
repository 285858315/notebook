'use strict'
var babel = require("babel-core")
var code = babel.transform("import {isArraay as a} from 'util';console.log(a([]))",{}).code
//eval(code)
console.log(code)
