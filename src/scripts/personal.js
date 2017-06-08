var $ = require('./libs/jquery.min.js');
var str_index = require("./templates/index.string");
var dot = require("./libs/jquery.dotdotdot.min.js");
var hammer = require('./libs/hammer.min.js');

var body = document.body;
body.innerHTML = str_index + body.innerHTML;

window.onload = function(){
	$(".more-btn").on("click",function(){
		$(".articleList").hide();
		$(".editor").hide();
		$(".articleDetail").show();
	});
	$(".back-btn").on("click",function(){
		$(".articleList").show();
		$(".editor").hide();
		$(".articleDetail").hide();
	});
	$(".write").on("click",function(){
		$(".articleList").hide();
		$(".articleDetail").hide();
		$(".editor").show();
	});
	$(".screen span").not('.write').on("click",function(){
		$(".articleDetail").hide();
		$(".editor").hide();
		$(".articleList").show();
	});
};