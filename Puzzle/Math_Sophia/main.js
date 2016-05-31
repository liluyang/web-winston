/**
 * Customization for Sophia
 */
var g_addMax = 30;
var g_subMax = 30;
var g_multiMax = 9;
var g_multiMax2 = 9;
var g_divMax = 9;

function changeLevel() {
	var level = $("#Level").val();
	if (level == "1") {
		g_addMax = 30;
		g_subMax = 30;
		g_proportion = [0.7, 0.3, 0, 0];
	}
	else if (level == "2") {
		g_addMax = 40;
		g_subMax = 30;
		g_proportion = [0.7, 0.3, 0, 0];
	}
	else if (level == "3") {
		g_addMax = 50;
		g_subMax = 40;
		g_proportion = [0.6, 0.4, 0, 0];
	}
	else {
		g_addMax = 99;
		g_subMax = 40;
		g_proportion = [0.5, 0.5, 0, 0];
	}
	newQuiz();
}