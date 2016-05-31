var g_expr;

var g_numbers;

$(function() {
	$("#Calc").click(calc24);
});

function calc24() {
	var a = $("#Numbers").val().split(" ");
	g_numbers = [];
	for (var i=0; i<a.length; i++) {
		if (a[i].length > 0) g_numbers.push(parseInt(a[i]));
	}
	
	g_expr = "%24%";
	$("#Result").text("");
	$("#Starting").show();
	
	// Give brower time to show starting
	setTimeout("startCalc()", 10);
}

function startCalc() {
	if (run(g_numbers)) {
		$("#Result")
			.css("color", "blue")
			.text("Solution: " + g_expr.replace(/%/g, "") + " = 24");
	}
	else {
		$("#Result")
			.css("color", "red")
			.text("Sorry, no solution found.");
	}
	$("#Starting").hide();
}

function run(a) {
	if (a.length == 1) return a[0] == 24;

	for (var i = 0; i < a.length; i++) {
		for (var j = i + 1; j < a.length; j++) {
			if (check(a, i, j, '+') || 
				check(a, i, j, '-') || 
				check(a, j, i, '-') || 
				check(a, i, j, '*') || 
				check(a, i, j, '/') || 
				check(a, j, i, '/'))
				return true;
		}
	}

	return false;
}

function check(a, i, j, operand) {
	var b = [];
	for (var k = 0; k < a.length; k++) {
		if (k != i && k != j) b.push(a[k]);
	}

	var m;
	switch (operand) {
	case '+':
		m = a[i] + a[j];
		break;
	case '-':
		if (a[i] < a[j])
			return false; 				// ignore negative
		m = a[i] - a[j];
		break;
	case '*':
		m = a[i] * a[j];
		break;
	default: 							// '/'
		if (a[i] < a[j] || a[j]==0 || a[i] % a[j] != 0)
			return false; 				// ignore non-dividable
		m = a[i] / a[j];
	}
	b.push(m);
	
	if (run(b)) {
		g_expr = g_expr.replace("%" + m + "%", "(%" + a[i] + "% " + operand + " %" + a[j] + "%)");
		return true;
	}

	return false;
}