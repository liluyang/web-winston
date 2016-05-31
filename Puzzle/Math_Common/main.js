/*************************************************************
 * Math Problem Solver (for Winston/Sophia)
 * author: Luyang Li
 ************************************************************/

var g_rows = 5;
var g_cols = 4;

var g_qt;

$(function() {
	$("#NewQuiz").click(newQuiz);
	$(window).keydown(showAnswer);
	$("#Verify").click(verifyAnswer);
	$("#Level").change(changeLevel);
	$("#Level").val("1");
	changeLevel();
	newQuiz();
});

function showAnswer(evt) {
	if (evt.keyCode != 81) return;
	$(".answer").each(function() {
		var input = $(this);
		var expected = $.data(input[0], "answer");
		if (input.val() == expected) {
			input.val("");
			input.removeClass("right");
		}
		else {
			input.val(expected);
		}
	});
}

function newQuiz() {
	var table = $("#MathTable");
	table.empty();
	g_qt = [];
	
	for (var i=0; i<g_rows; i++) {
		var row = $("<tr>").appendTo(table);
		
		for (var j=0; j<g_cols; j++) {
			var cell = $("<td>").appendTo(row);
			var question = newQuestion();
			cell.text(question[0]);
			
			var input = $("<input type=text value=''>")
				.addClass("answer")
				.appendTo(cell);
			$.data(input[0], "answer", question[1]);
		}
	}
}

function newQuestion() {
	var question = generateQuestion(Math.random());
	for (var i=0; i<g_qt.length; i++) {
		if (question[0] == g_qt[i]) return newQuestion();
	}
	g_qt.push(question[0]);
	return question;
}

function generateQuestion(r) {
	if (r < g_proportion[0]) {
		return newAdd();
	}
	
	r -= g_proportion[0];
	if (r < g_proportion[1]) {
		return newSubtract();
	}
	
	r -= g_proportion[1];
	if (r < g_proportion[2]) {
		return newMultiply();
	}
	
	return newDivide();
}

function newAdd() {
	var a = newRandom(g_addMax);
	var b = newRandom(g_addMax);
	return [a + " + " + b + " = ", a+b];
}

function newSubtract() {
	var a = newRandom(g_subMax);
	var b = newRandom(a);
	return [a + " - " + b + " = ", a-b];
}

function newMultiply() {
	var a = newRandom(g_multiMax);
	var b = newRandom(g_multiMax2);
	return [a + " x " + b + " = ", a*b];
}

function newDivide() {
	var a = newRandom(g_divMax);
	var b = newRandom(g_divMax);
	return [(a*b) + " / " + a + " = ", b];
}

function newRandom(range) {
	return 1 + Math.floor( Math.random() * range );
}

function verifyAnswer() {
	$(".answer").each(function() {
		var input = $(this);
		var expected = $.data(input[0], "answer");
		if (input.val() != "" && input.val() == expected) {
			input.removeClass("wrong");
			input.addClass("right");
		}
		else {
			input.removeClass("right");
			input.addClass("wrong");
		}	
	});
}