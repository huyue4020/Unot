var $ = require('./libs/jquery.min.js');
var str_sign = require("./templates/sign.string");
var dot = require("./libs/jquery.dotdotdot.min.js");
var hammer = require('./libs/hammer.min.js');

var body = document.body;
body.innerHTML = str_sign + body.innerHTML;

window.onload = function(){
	$(".common-header a").on("click",function(){
		$(this).addClass('active-sign').siblings('a').removeClass('active-sign');
		if($(this).index()==2){
			$(".login").hide();
			$(".sign").show();
		}else{
			$(".login").show();
			$(".sign").hide();
		};
	});
	/*------邮箱验证 /^1[34578]\d{9}$|^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/------*/
	var reUser = /^1[34578]\d{9}$|^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	function fUser(){
        if(reUser.test($("#inputEmail1").val()) && $("#inputEmail1").val()){
        	$(this).siblings('.tip-email').fadeOut('fast', function() {
        		$(this).find("strong").html("");
        	});
        }else if($("#inputEmail1").val()==""){
        	$(this).siblings('.tip-email').find("strong").html("账户不能为空！");
        	$(this).siblings('.tip-email').fadeIn('fast', function() {});
        }else{
        	$(this).siblings('.tip-email').find("strong").html("账户格式不正确！");
           	$(this).siblings('.tip-email').fadeIn('fast', function() {});
        }	
    }
    /*------------------密码格式验证 /^[a-zA-Z0-9]{6,10}$/ -------------------*/
	var rePwd = /^[a-zA-Z0-9]{6,20}$/ ;
	function fPwd (){
        if(rePwd.test($("#inputPassword1").val()) && $("#inputPassword1").val()){
           $(".tip-password").fadeOut('fast', function() {
        		$(this).find("strong").html("");
        	});
        }else if($("#inputPassword1").val()==""){
            $(".tip-password").find("strong").html("密码不能为空！");
        	$(".tip-password").fadeIn('fast', function() {});
        }else{
            $(".tip-password").find("strong").html("密码格式不正确！");
           	$(".tip-password").fadeIn('fast', function() {});
        }
    }
    $(".close").on("click",function(){
    	$(this).parent(".alert").fadeOut('fast', function() {
        	$(this).find("strong").html("");
    	});
    });
    $("#inputEmail1").blur(function(){
	    fUser();
	})
	$("#inputEmail2").blur(function(){
	    fUser();
	})
	$("#inputPassword1").blur(function(){
	    fPwd();
	})
   	$("#inputPassword2").blur(function(){
	    fPwd();
	})
	$("#inputPassword3").blur(function(){
	    fPwd();
	})
};