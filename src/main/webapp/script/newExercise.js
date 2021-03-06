var createExerciseType = "selectionExercise";
var stdGrade = "1";
var selted = "scbA";
var judgeans = "false";
var completionAnswer = "";
var newExerciseSubmit = "";
var show = true;
$("document").ready(function(){	
	//设置默认值，可以从服务器获取
	$("#selectionExercise").addClass("selectedtab");
	$("#sg1").addClass("selectedtab");
	$("#scbA").addClass("scb-rb-sb-item-selected");
	$("#jgans2").addClass("jgans2-selected");
	
	//获取题目的类型
	$(".et-opt").click(function(){
		$(".et-opt").removeClass("selectedtab");
		$(this).addClass("selectedtab");
		createExerciseType = $(this).attr("id");
		$(".row3").css("display", "none");
		$(".etcc").css("display", "none");
		if($(this).attr("id")=="selectionExercise"){
			$("#seltab").css("display", "block");
			$("#pre1").css("display", "block");
		} else if($(this).attr("id")=="completionExercise"){
			$("#comtab").css("display", "block");
			$("#pre2").css("display", "block");
		} else if($(this).attr("id")=="answerExercise"){
			$("#anstab").css("display", "block");
			$("#pre3").css("display", "block");
		} else if($(this).attr("id")=="judgeExercise"){
			$("#jugtab").css("display", "block");
			$("#pre4").css("display", "block");
		}
	});
	$("#returnToListImg").click(function() {
		$("#wldcListBoxUl").empty();
		$.getAllExercise();
	});
	//获取判断题答案
	$(".jgans-opt").click(function(){
		var temp = $(this).attr("id");
		if(temp=="jgans1") {
			judgeans = "true";
			$("#jgans2").removeClass("jgans2-selected").addClass("jgans-opt2");
			$(this).removeClass("jgans-opt1").addClass("jgans1-selected");
		} else {
			judgeans = "false";
			$("#jgans1").removeClass("jgans1-selected").addClass("jgans-opt1");
			$(this).removeClass("jgans-opt2").addClass("jgans2-selected");
		}
	});

	//获取题目的分数设置,sg1:stdGrade=1,sgx:stdGrade=input
	$(".ercb-item").click(function(){
		$(".ercb-item").removeClass("selectedtab");
		$(this).addClass("selectedtab");
		var temp = $(this).attr("id");
		if(temp=="sgxbox"){
			$("#sgx").blur(function(){
				sgxTemp = $("#sgx").val();
				if(sgxTemp!="") stdGrade = sgxTemp;
				else {
					$(".ercb-item").removeClass("selectedtab");
					$("#sg"+stdGrade).addClass("selectedtab");
				}
				$("#sgx").unbind("blur");
			});
		} else {
			if(temp=="sg1")	stdGrade=1;
			else if (temp=="sg2")	stdGrade=2;
			else if (temp=="sg5")	stdGrade=5;
			else if (temp=="sg10")	stdGrade=10;
			else stdGrade = temp;
		}
	});
	
	//设置选择题点击选项的动作
	$(".scb-rb-sb-item").click(function(){
		$(".scb-rb-sb-item").removeClass("scb-rb-sb-item-selected");
		$(this).addClass("scb-rb-sb-item-selected");
		selted = $(this).attr("id");
	});
	
	//设置提示弹出事件
	$(".etsb-tip-ctn-more").click(function(){
		if($("#toggleTip").hasClass("etsb-tip-ctn-flat")){
			$("#toggleTip").removeClass("etsb-tip-ctn-flat").addClass("etsb-tip-ctn-flat-down");
		} else {
			$("#toggleTip").removeClass("etsb-tip-ctn-flat-down").removeClass("etsb-tip-ctn").addClass("etsb-tip-ctn-flat");
		}
	});
	
	//设置自动获取填空题答案事件
	$("#cpltopic").keyup(function(){
		var ctntemp = $("#cpltopic").val();
		var reg = /[^\/]\[[^\[\]\/]*[^\/]\]/g;
		var vals = ctntemp.match(reg);
		if(vals!=null){
			$("#cpllist").empty();
			completionAnswer = "";
			for(var i=0; i<vals.length; i++){
				var vart = vals[i];
				vart = vart.substring(2,vart.length-1);
				$("#cpllist").append("<li>"+vart+"</li>");
				completionAnswer += vart + ",";
			}
		}
	});
	
	//设置提交题目事件
	$("#etsb-save").click(function(){
		if(createExerciseType=="selectionExercise"){
			var selCtn = $("#seltab-fulltopic").val();
			if($.trim(selCtn)!=""){
				$.post("ce/newOne",
				{
					createExerciseType:createExerciseType,
					stdGrade:stdGrade,
					selCtn:selCtn,
					selted:selted
				}, function(){
					msgok("OK, 题目保存成功！");
				});
			} else {
				msgerror("ERROR, 请输入题目的内容！");
			}
		} else if(createExerciseType=="completionExercise") {
			var cplCtn = $("#cpltopic").val();
			if($.trim(cplCtn)!=""){
				console.log(completionAnswer);
				$.post("ce/newOne",
				{
					createExerciseType:createExerciseType,
					stdGrade:stdGrade,
					cplCtn:cplCtn,
					completionAnswer:completionAnswer
				}, function(){
					msgok("OK, 题目保存成功！");
				});
			} else {
				msgerror("ERROR, 请输入题目的内容！");
			}
		} else if(createExerciseType=="answerExercise") {
			var anstopic = $("#anstopic").val();
			var anskw = $("#anskw").val();
			if($.trim(anstopic)!=""&&$.trim(anskw)!=""){
				$.post("ce/newOne",
				{
					createExerciseType:createExerciseType,
					stdGrade:stdGrade,
					anstopic:anstopic,
					anskw:anskw
				}, function(){
					msgok("OK, 题目保存成功！");
				});
			} else {
				msgerror("ERROR, 请输入题目和解答！");
			}
		} else if(createExerciseType=="judgeExercise") {
			var jgtopic = $("#jgtopic").val();
			if($.trim(jgtopic)!=""){
				$.post("ce/newOne",
				{
					createExerciseType:createExerciseType,
					stdGrade:stdGrade,
					jgtopic:jgtopic,
					judgeans:judgeans
				}, function(){
					msgok("OK, 题目保存成功！");
				});
			} else {
				msgerror("ERROR, 请输入题目的内容！");
			}
		}
	});
	$("#selectClass").change(function() {
		var teacherId = 0;
		$.post("login/getTeacherId", "", function(data){
			teacherId = eval("(" + data + ")").tid;
			if(teacherId == 0) {
				msgerror("登陆超时！请重新登陆");
				return;
			}
			var tp = "";
			var checks = $("input.wldccb");
			for(var i =0; i < checks.length; i++)
				if(true == checks[i].checked) {
					var check = checks[i].value.split("_");
					tp += check[1] + ":" + check[0] + ",";
				} 
			var ar = $("#selectClass").val().split("_");
			$.post("ei/assignment", {			
				teacherId:teacherId,
				classId:ar[1],
				exs:tp
			},function(data) {
				msgok("分发成功");
				$("#selectClassPos").css("display", "none");
			});
		});
	});
	$("#shareButton").click(function() {
		if($.isSltCheckbox()) {
			var url = "ap/selectName?typeName=sbClass";
			$.post(url, "", function(data){
				$("#selectClassPos").css("display", "block");
				var obj = eval("(" + data + ")").list;
				for(var i = 0; i < obj.length; i++) {
					str = "<option value=\"sc_" + obj[i].id + "\">" + obj[i].name + "</div>";
					$("#selectClass").html($("#selectClass").html() + str);
				}
			});
		} 
		else {
			alert('请先选择题目！');
			return;
		}
	});
	//设置按钮事件
	$("#delButton").click(function(){
		var isCreateMode = $("#createWorkBox").css("display") == "block";
		if(isCreateMode){
			if (createExerciseType=="selectionExercise") $("#seltab-fulltopic").val("");
			else if (createExerciseType=="completionExercise") {
				$("#cpltopic").val("");
				$("#cpllist").empty();
			}
			else if (createExerciseType=="answerExercise") {
				$("#anstopic").val("");
				$("#anskw").val("");
			}
			else if (createExerciseType=="judgeExercise") $("#jgtopic").val("");
		} else {
			if($.isSltCheckbox() == false) {
				alert("请先选择要删除的题目");
				return ;
			}
			var checks = $("input.wldccb");
			for(var i =0; i < checks.length; i++) {
				if(true == checks[i].checked) {
					var ar = checks[i].value.split("_");
					$.post("ce/deleteById", {
						type:ar[0],
						id:ar[1]
					}, function(data){
						msgok(eval("(" + data + ")").info);
						$("#wldcListBoxUl").empty();
						$.getAllExercise();						
					});
				} 
			}						
		}
	});
});
$.extend({
	showCwCoursing:function(coursing) {
		//console.log(coursing.length);
        $("#cwCoursing").empty();
		for(var i = 0; i < coursing.length; i++) {
			var s = coursing[i].fullTopic;
			if(coursing[i].fullTopic.length > 20)
				s = coursing[i].fullTopic.substring(0, 20) + ".....";
			$("#cwCoursing").append("<li><a href='#'>" + s + "</a></li>");
		}
	},	
	getAllExercise:function() {
		$.post("ce/getAllExercise", "", function(data){
//			console.log(data);
			$.showAllExercise(eval("(" + data + ")"));
		});
	},
	isSltCheckbox:function() {
		var checks = $("input.wldccb");
		for(var i =0; i < checks.length; i++)
			if(true == checks[i].checked) 
				return true;
		return false;
	},
	appendExercise:function(topic, id, odd) {
        var tp = topic;
        if(topic.length > 31) {
            tp = topic.substring(0, 31) + "...";
        }
		var str = "	<li id=\"" + id + "\"> " +
        "   <div class=\"wldcItem wldcItem" + odd + "\" onMouseOver=\"lightUpRow(this);\" onMouseOut=\"reBg(this, '" + odd + "');\"> " +
        "    <div class=\"pullleft wldcCheckboxBox\"> " +
        "        <input type=\"checkbox\" class=\"wldccb\" value=\"" + id + "\" id=\"box_" + id + "\" /> " +
        "    </div> " +
        "    <div class=\"pullleft wldcAttr\"></div> " +
        "   <div class=\"pullleft wldcContent\">" + tp + "</div> " +
        "    <div class=\"pullright wldcAttr wldcAttrAfterCont wldcAttrAfterContEnd\"> " +
        "        <div class=\"flatbtn wldcaacBtn\" id=\"answer_" + id + "\" onMouseOver=\"pmt('answer_" + id + "', '点击查看该题答案');\" onMouseOut=\"erasePmt();\"> " +
        "            <div class=\"answerButtonImg\"></div> " +
        "        </div> " +
        "    </div> " +
        "    <div class=\"pullright wldcAttr wldcAttrAfterCont\"> " +
        "        <div class=\"flatbtn wldcaacBtn\" id=\"detail_" + id + "\" onMouseOver=\"pmt('detail_" + id + "', '查看该习题的完整信息');\" onMouseOut=\"erasePmt();\"> " +
        "            <div class=\"detailButtonImg\"></div> " +
        "        </div> " +
        "    </div> " +
        "    <div class=\"pullright widcAttr\"> " +
        "       <div id=\"quickLook_" + id + "\" class=\"wldcQuickLookBtn flatbtn wldcAttrAfterCont\" onMouseOver=\"pmt('quickLook_" +
            id + "', '" + topic + "');\" onMouseOut=\"erasePmt();\">快速预览</div> " +
        "    </div> " +
        "    <div class=\"clearboth\"></div> " +
        "    </div> " +
        "    </li>";
		$("#wldcListBoxUl").append(str);
		
//		$("#quickLook_" + id).mouseover(function() {
//			var o = id.split("_");
//            $.post("ce/quickLook", {
//                type:o[0],
//                id:0[1]
//            }, function(data){
//                /*			$(".quickLook.mainbox.pullleft").css("display", "block");
//                 $(".quickLook.mainbox.pullleft").html(data.substring(1, data.length-1));*/
//                pmt(o, data.substring(1, data.length-1));
//            });
//		});
//		$("#quickLook_" + id).mouseout(function() {
//			erasePmt();
//		});
		$("#answer_" + id).click(function() {
			if(true == show) {
				var o = id.split("_");
				$.showAnswerInfo(o[0], o[1]);	
				show = false;
				setTimeout('$.hideQuickLook();', 3000);
			} else {
				$.hideQuickLook();
			}
		});	
		$("#answer_" + id).mouseout(function () {
			$(".quickLook.mainbox.pullleft").css("display", "none");
			show = true;
		});
	},
	hideQuickLook:function() {
		$(".quickLook.mainbox.pullleft").css("display", "none");
		show = true;
	},
	showAnswerInfo:function(type, id) {
		$.post("ce/showAnswerInfo", {
			type:type,
			id:id
		}, function(data){
			$(".quickLook.mainbox.pullleft").css("display", "block");
			$(".quickLook.mainbox.pullleft").html(data.substring(1, data.length-1));
		});
	},
	quickLookInfo:function(o) {
		var v = o.split("_");
		$.post("ce/quickLook", {
			type:v[0],
			id:v[1]
		}, function(data){
/*			$(".quickLook.mainbox.pullleft").css("display", "block");
			$(".quickLook.mainbox.pullleft").html(data.substring(1, data.length-1));*/
            //pmt(o, data.substring(1, data.length-1));
            return data.substring(1, data.length-1);
		});
	},
	showAllExercise:function(obj) {
		for(var i = 0; i < obj.length - 1; i++) {
			if(i%2 == 0)
				$.appendExercise(obj[i].topic, obj[i].type + "_" + obj[i].id, "Odd");
			else
				$.appendExercise(obj[i].topic, obj[i].type + "_" + obj[i].id, "Even");
		}
		$.showCwCoursing(obj[obj.length-1]);
	}
});


