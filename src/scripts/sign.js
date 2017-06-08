var $ = require('./libs/jquery.min.js');
var str_sign = require("./templates/sign.string");
var dot = require("./libs/jquery.dotdotdot.min.js");
var hammer = require('./libs/hammer.min.js');
// var idcode = require("./libs/jquery.idcode.js");

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
	function fUser(obj){
        if(reUser.test(obj.val()) && obj.val()){
        	obj.next('.alert').fadeOut('fast', function() {
        		obj.find("strong").html("");
        	});
            return true;
        }else if(obj.val()==""){
        	obj.next('.alert').find("strong").html("账户不能为空！");
        	obj.next('.alert').fadeIn('fast', function() {});
            return false;
        }else{
        	obj.next('.alert').find("strong").html("账户格式不正确！");
           	obj.next('.alert').fadeIn('fast', function() {});
            return false;
        }	
    }
    /*------------------密码格式验证 /^[a-zA-Z0-9]{6,10}$/ -------------------*/
	var rePwd = /^[a-zA-Z0-9]{6,20}$/ ;
	function fPwd (obj){
        if(rePwd.test(obj.val()) && obj.val()){
           obj.next('.alert').fadeOut('fast', function() {
        		$(this).find("strong").html("");
        	});
           return true;
        }else if(obj.val()==""){
            obj.next('.alert').find("strong").html("密码不能为空！");
        	obj.next('.alert').fadeIn('fast', function() {});
            return false;
        }else{
            obj.next('.alert').find("strong").html("密码格式不正确！");
           	obj.next('.alert').fadeIn('fast', function() {});
            return false;
        }
    }
    function fRpwd(fir,sec){
        if( fir.val() == sec.val() ){
            sec.next('.alert').fadeOut('fast', function() {
                sec.find("strong").html("");
            });
            return true;
        }else{
            sec.next('.alert').find("strong").html("两次密码不一致！");
            sec.next('.alert').fadeIn('fast', function() {});
            return false;
        }
    }
    $(".close").on("click",function(){
    	$(this).parent(".alert").fadeOut('fast', function() {
        	$(this).find("strong").html("");
    	});
    });
    $("#inputEmail1").blur(function(){
	    fUser($(this));
	})
	$("#inputEmail2").blur(function(){
	    fUser($(this));
	})
	$("#inputPassword1").blur(function(){
	    fPwd($(this));
	})
   	$("#inputPassword2").blur(function(){
	    fPwd($(this));
	})
	$("#inputPassword3").blur(function(){
	    fPwd($(this));
        fRpwd($("#inputPassword2"),$(this));
	})

    /*----------------------------验证码 -----------------------------*/
    var regCode = (function($){
        var settings = {
                e           : 'idcode',
                codeType    : { name : 'follow', len: 6},
                codeTip     : 'refresh?',
                inputID     : 'Txtidcode'          //引用验证码输入框Id
            };
        
        var _set = {
            storeLable  : 'codeval',
            store       : '#ehong-code-input',
            codeval     : '#ehong-code'
        }
        $.idcode = {
            getCode:function(option){
                _commSetting(option);
                return _storeData(_set.storeLable, null);
            },
            setCode:function(option){
                _commSetting(option);
                _setCodeStyle("#"+settings.e, settings.codeType.name, settings.codeType.len);
                
            },
            validateCode:function(option){
                _commSetting(option);
                var inputV;
                if(settings.inputID){
                    inputV=$('#' + settings.inputID).val();
                }else{
                    inputV=$(_set.store).val();
                }
                
                if(inputV == _storeData(_set.storeLable, null)){
                    return true;
                }else{
                    _setCodeStyle("#"+settings.e, settings.codeType.name, settings.codeType.len);               
                    return false;
                }
            }
        };
        
        function _commSetting(option){
            $.extend(settings, option);     
        }
        
        function _storeData(dataLabel, data){
            var store = $(_set.codeval).get(0);         
            if(data){
                $.data(store, dataLabel, data);         
            }else{
                return $.data(store, dataLabel);            
            }
        }
        
        function _setCodeStyle(eid, codeType, codeLength){
            var codeObj = _createCode(settings.codeType.name, settings.codeType.len);       
            var randNum = Math.floor(Math.random()*6);
            var htmlCode=''
            if(!settings.inputID){
                htmlCode='<span><input id="ehong-code-input" type="text" maxlength="4" /></span>';
            }
            htmlCode+='<div id="ehong-code" class="ehong-idcode-val ehong-idcode-val';
            htmlCode+=String(randNum);
            htmlCode+='" href="#" onblur="return false" onfocus="return false" oncontextmenu="return false">' + _setStyle(codeObj) + '</div>' + '<span id="ehong-code-tip-ck" class="ehong-code-val-tip" onclick="$.idcode.setCode()">'/*+ settings.codeTip*/ +'</span>';
            $(eid).html(htmlCode);
            _storeData(_set.storeLable, codeObj);
            $("#ehong-code").on("click",function(){
                $.idcode.setCode();
            });  
        }
        
        function _setStyle(codeObj){
            var fnCodeObj = new Array();
            var col = new Array('#BF0C43', '#E69A2A','#707F02','#18975F','#BC3087','#73C841','#780320','#90719B','#1F72D8','#D6A03C','#6B486E','#243F5F','#16BDB5');
            var charIndex;
            for(var i=0;i<codeObj.length;i++){      
                charIndex = Math.floor(Math.random()*col.length);
                fnCodeObj.push('<font color="' + col[charIndex] + '">' + codeObj.charAt(i) + '</font>');
            }
            return fnCodeObj.join('');      
        }
        function _createCode(codeType, codeLength){
           var codeObj;
           if(codeType=='follow'){
               codeObj = _createCodeFollow(codeLength);
           }else if(codeType=='calc'){
               codeObj = _createCodeCalc(codeLength);
           }else{
               codeObj="";
           }
           return codeObj;   
         }
         
         function _createCodeCalc(codeLength){
           var code1, code2, codeResult;
           var selectChar = new Array('0','1','2','3','4','5','6','7','8','9'); 
           var charIndex;
           for(var i=0;i<codeLength;i++){       
               charIndex = Math.floor(Math.random()*selectChar.length);
               code1 +=selectChar[charIndex];
               
               charIndex = Math.floor(Math.random()*selectChar.length);
               code2 +=selectChar[charIndex];          
           }
           return [parseInt(code1), parseInt(code2) , parseInt(code1) + parseInt(code2)] ;
         }
         
         function _createCodeFollow(codeLength){
           var code = "";
           var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
            
           for(var i=0;i<codeLength;i++){       
               var charIndex = Math.floor(Math.random()*selectChar.length);
               if(charIndex % 2 == 0){
                   code+=selectChar[charIndex].toLowerCase();
               }else{
                   code +=selectChar[charIndex];
               }       
           }
           return code;
         }
       
    })($);
    function fRegCode(obj){
        var resCode = $.idcode.getCode();
        var resVal = obj.val();
        if(resVal == ""){
             obj.next(".alert").find("strong").html("验证码不能为空！");
             obj.next('.alert').fadeIn('fast', function() {});
             return false;
        }else if(resVal != resCode){
             obj.next(".alert").find("strong").html("验证码不正确！");
             obj.next('.alert').fadeIn('fast', function() {});
             return false;
        }else{
             obj.next('.alert').fadeOut('fast', function() {
                obj.find("strong").html("");
            });
            return true;
        }
    }
    $.idcode.setCode();   //加载生成验证码方法
    $("#validateCode").blur(function(){
        fRegCode($(this));
    })
    $(".reCode").on("click",function(){
        $.idcode.setCode();
    });
    // 注册
    $("#register").on("click",function(){
        fUser($("#inputEmail2"));
        fPwd($("#inputPassword2"));
        fPwd($("#inputPassword3"));
        fRegCode($("#validateCode"));
        fRpwd($("#inputPassword2"),$("#inputPassword3"));
    });
    // 登录
    $("#login").on("click",function(){
        var user = fUser($("#inputEmail1"));
        var pwd = fPwd($("#inputPassword1"));
    });
};