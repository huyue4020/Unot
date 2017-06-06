var $ = require('./libs/jquery.min.js');
var str_index = require("./templates/index.string");
var dot = require("./libs/jquery.dotdotdot.min.js");
var hammer = require('./libs/hammer.min.js');

var body = document.body;
body.innerHTML = str_index + body.innerHTML;

window.onload = function(){
	
};