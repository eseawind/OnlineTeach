


/*
 * 生成题目的工作流程
 * 每出现一道题，为其生成一个rpl_no，然后根据类型创建该题的div在网页上进行显示
 * 
 * */
 
$("document").ready(function(){
	//学生答题部分
	//选择题，单击设定选择的值
	var rpl_no = "tpl";	//rpl: reply
	var rpl_type = "select";
	$(".sel-opt-"+rpl_no).click(function(){
		var markOpt = $(this).attr("id") + "-ed";
		//先设定选择的结果
		var clkVal = "";
		if(markOpt.indexOf("a")>0)	clkVal = "a";
		else if(markOpt.indexOf("b")>0)	clkVal="b";
		else if(markOpt.indexOf("c")>0)	clkVal="c";
		else if(markOpt.indexOf("d")>0)	clkVal="d";
		else	msgerror("严重错误！系统无法获取你点击的选项！");
		$("#sel-"+rpl_no+"-val").val(clkVal);
		//再显示视觉效果
		$(".sel-"+rpl_no+"-ed").removeClass("sel-sb-opt-ed");
		$("#"+markOpt).addClass("sel-sb-opt-ed");
	});
	
	//判断题
	$(".jug-"+rpl_no+"-opt").click(function(){
		var markOpt = $(this).attr("id") + "-ed";
		var clkVal = "0";
		if(markOpt.indexOf("a")>0)	clkVal = "1";
		else if(markOpt.indexOf("b")>0)	clkVal="2";
		else	msgerror("严重错误！系统无法获取你的判断结果！");
		$("#jug-"+rpl_no+"-val").val(clkVal);
		$(".jug-"+rpl_no+"-ed").removeClass("sel-sb-opt-ed");
		$("#"+markOpt).addClass("sel-sb-opt-ed");
	});
	
	//获取自己的题目单（所有试卷）
	var getExssUrl ="ei/getExss?sid="+$("#sid").text();
	$.getJSON(getExssUrl, function(result){
		$.each(result, function(i, field){
			var exs = '<tr><td style="width:10%;">@NO@</td>' +
					'<td style="width:30%;"><a href="#">@HOLD@</a></td>' +
					'<td style="width:45%;">@TI@</td>' +
					'<td style="width:15%;"><a href="#question_begin" onclick="return setExercise($(this));" class="beginAnswer" id="ba-@esId@">开始答题</a></td></tr>';
			exs = exs.replace(/@HOLD@/,field.founder).replace(/@TI@/,field.cdate).replace(/@NO@/,i+1).replace(/@esId@/,field.esId);
			$("#exList").append(exs);
		});
	});
	



});

var selectionTpl = ""+
'    <div class="mainbox container replyItem" id="sel-tpl">'+
'    	<h3 class="itemCount divInfo" id="itemCount-tpl">@idx@</h3>'+
'        <div class="single_question_answer">'+
'            <div class="single_question" id="selQes-tpl">@ctn@</div>'+
'        </div>'+
'        <div class="sel-select-box">'+
'        	<input type="hidden" name="sel-tpl-val" value="" id="sel-tpl-val" />'+
'			<div class="sel-sb-opt sel-sb-a sel-opt-tpl pullleft" id="sel-a-tpl">A<div class="sel-tpl-ed" id="sel-a-tpl-ed"></div></div>'+
'			<div class="sel-sb-opt sel-sb-b sel-opt-tpl pullleft" id="sel-b-tpl">B<div class="sel-tpl-ed" id="sel-b-tpl-ed"></div></div>'+
'			<div class="sel-sb-opt sel-sb-c sel-opt-tpl pullleft" id="sel-c-tpl">C<div class="sel-tpl-ed" id="sel-c-tpl-ed"></div></div>'+
'			<div class="sel-sb-opt sel-sb-d sel-opt-tpl pullleft" id="sel-d-tpl">D<div class="sel-tpl-ed" id="sel-d-tpl-ed"></div></div>'+
'			<div class="clearboth"></div>'+
'        </div>'+
'    </div>';
var questionTpl = ""+
'    <div class="mainbox container replyItem" id="ans-tpl">'+
'    	<h3 class="itemCount divInfo" id="itemCount-tpl">@idx@</h3>'+
'        <div class="answer_question">'+
'            <div class="a_question" id="ans-tpl">@ctn@</div>'+
'            <div class="inputArea">'+
'                <div class="a_txt">答：</div>'+
'                <textarea rows="10" cols="131" class="a_answer inputField sslote" name="answer1" id="ans-tpl-val" ></textarea>'+
'            </div>'+
'        </div>'+
'    </div>';
var judgeTpl = ""+
'    <div class="mainbox container replyItem" id="jug-tpl">'+
'    	<h3 class="itemCount divInfo" id="itemCount-tpl">@idx@</h3>'+
'        <div class="judge_question">'+
'            <div class="j_question">@ctn@</div>'+
'        </div>'+
'        <div class="j_answer_box">'+
'        	<input type="hidden" name="jug-tpl-val" value="" id="jug-tpl-val" />'+
'			<div class="j_true j_answer jug-tpl-opt pullleft" id="jug-tpl-opt-a">√<div class="jug-tpl-ed" id="jug-tpl-opt-a-ed"></div></div>'+
'			<div class="j_false j_answer jug-tpl-opt pullleft" id="jug-tpl-opt-b">x<div class="jug-tpl-ed" id="jug-tpl-opt-b-ed"></div></div>'+
'			<div class="clearboth"></div>'+
'        </div>'+
'    </div>';
var completionTpl = ""+
'    <div class="mainbox container replyItem" id="cpl-tpl" >'+
'    	<h3 class="itemCount divInfo" id="itemCount-tpl">@idx@</h3>'+
'        <div class="fill_vacant_question">'+
'            <div class="fv_question" id="cpl-ctn-tpl">@ctn@</div>'+
'        </div>'+
'    </div>';
var completionSpaceTpl = '<input type="text" name="fv_answer" class="fv_input cpl-tpl-vals" />';


var COUNTER = 0;
$.extend({TplPlus:function(){
		COUNTER++;
	}
});

//TODO 能在控制台显示了，将其显示到页面上去。未完成
function setExercise(ele){
	var idStr = ele.attr("id");
	esId = idStr.substring(3,idStr.length);
	$.getJSON("ei/getExs?esId="+esId, function(result){
		$.each(result, function(i, field){
			var type = field.type;
			if(type!=null&&type!=""&&type=="selection"){
				var myDiv = selectionTpl;
				myDiv = myDiv.replace(/tpl/g,COUNTER).replace(/@idx@/,COUNTER+1).replace(/@ctn@/g,field.selCtn).replace(/@br@/g,"<br>");
				$.TplPlus();
				$("#daTit").append(myDiv);
			} else if(type!=null&&type!=""&&type=="judge"){
				console.log("判断题："+field.jugCtn);
			} else if(type!=null&&type!=""&&type=="completion"){
				console.log("填空题："+field.cplCtn);
			} else if(type!=null&&type!=""&&type=="question"){
				console.log("问答题："+field.qesCtn);
			}  else return false;
		});
	});
	return true;
}


//获取指定选择题(rpl_no为rpl_no)答案
//get selection reply answer
function getSelRplAns(rpl_no){
	return $("#sel-"+rpl_no+"-val").val();
}
//获取指定的问答题的答案
function getAnsRplAns(rpl_no){
	return $("#ans-"+rpl_no+"-val").val();
}
//获取指定判断题的答案
function getJugRplAns(rpl_no){
	return $("#jug-"+rpl_no+"-val").val();
}
//获取指定的填空题的答案们
function getCplRplAns(rpl_no){
	var ans = "[";
	$(".cpl-tpl-vals").each(function(){
		ans += '\"'+$(this).val() + '\",';
	});
	ans = ans.substring(0, ans.length-1);
	ans += "]";
	return ans;
}


