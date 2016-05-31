/**
 * Customization for Winston
 */
var g_addMax = 9999;
var g_subMax = 9999;
var g_multiMax = 99;
var g_multiMax2 = 99;
var g_divMax = 100;

function changeLevel() {
	var level = $("#Level").val();
	if (level == "1") {
		g_divMax = 20;
		g_multiMax = 99;
		g_proportion = [0.3, 0.3, 0.2, 0.2];
	}
	else if (level == "2") {
		g_divMax = 30;
		g_multiMax = 199;
		g_proportion = [0.2, 0.2, 0.3, 0.3];
	}
	else if (level == "3") {
		g_divMax = 50;
		g_multiMax = 499;
		g_proportion = [0.1, 0.2, 0.4, 0.3];
	}
	else {
		g_divMax = 99;
		g_multiMax = 999;
		g_proportion = [0.1, 0.1, 0.4, 0.4];
	}
	newQuiz();
}