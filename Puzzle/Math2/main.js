var g_rows = 4;

var g_cols = 4;

var g_qt;

$(function() {
	$("#NewQuiz").click(newQuiz);
	$("#Verify").click(verifyAnswer);
	$("#Level").change(newQuiz);
	newQuiz();
});

function newQuiz() {
	var table = $("#MathTable");
	table.empty();
	g_qt = [];
	
	for (var i=0; i<g_rows; i++) {
		var row = $("<tr>").appendTo(table);
		
		for (var j=0; j<g_cols; j++) {
			var cell = $("<td>").appendTo(row);
			var question = newQuestion();
			var r = Math.random();
			if (r < 0.33) {
				addInput(cell, question[0], true);
				addInput(cell, question[1]);
				addInput(cell, question[2]);
			}
			else if (r < 0.66) {
				addInput(cell, question[0]);
				addInput(cell, question[1], true);
				addInput(cell, question[2]);
			}
			else {
				addInput(cell, question[0]);
				addInput(cell, question[1]);
				addInput(cell, question[2], true);
			}
		}
	}
}

function addInput(cell, value, question) {
	var input = $("<input type=text value=''>")
		.appendTo(cell);
	
	if (question) {
		input.addClass("answer");
		$.data(input[0], "answer", value);
	}
	else {
		input.val(value);
		input.attr("disabled", "disabled");
	}
}

function newQuestion() {
	var question = generateSequence();
	var str = question.join("");
	for (var i=0; i<g_qt.length; i++) {
		if (str == g_qt[i]) return newQuestion();
	}
	g_qt.push(str);
	return question;
}

function generateSequence() {
	var level = $("#Level").val();
	var r = Math.random();

	if (level == "1") return newEasy();
	
	if (level == "2") {
		return r < 0.5? newEasy() : newSmall();
	}
	
	if (level == "3") {
		if (r < 0.33) return newEasy();
		if (r < 0.66) return newSmall();
		return newMedium();
	}
	
	if (r < 0.4) return newSmall();
	if (r < 0.7) return newMedium();
	return newBig();
}

function newSequence(range, gap) {
	var a = newRandom(range);
	var t = newRandom(gap);
	return [a, a+t, a+2*t];
}

function newEasy() {
	return newSequence(20, 1);
}

function newSmall() {
	return newSequence(15, 3);
}

function newMedium() {
	return newSequence(50, 5);
}

function newBig() {
	var t = newSequence(20, 2);
	var c = Math.random() < 0.5? 10 : 100;
	return [t[0]*c, t[1]*c, t[2]*c];
}

function newRandom(range) {
	return 1 + Math.floor( Math.random() * range );
}

function verifyAnswer() {
	var correct = 0;
	var total = 0;
	
	$(".answer").each(function() {
		var input = $(this);
		var expected = $.data(input[0], "answer");
		if (input.val() != "" && input.val() == expected) {
			input.removeClass("wrong");
			input.addClass("right");
			correct++;
		}
		else {
			input.removeClass("right");
			input.addClass("wrong");
		}	
		
		total++;
	});

	var score = Math.floor(100 * correct / total);
	if (score < 80) return;
	
	var image = 1 + Math.floor(score/4 - 20);
	$("#Praise").attr("src", "../images/praise" + image + ".jpg");
	
	$("#Comment1").text(correct);
	$("#Comment2").text(score);
	
	$("#Award").dialog();
}