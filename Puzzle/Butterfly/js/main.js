/**
 * Image names
 */
var g_images = ["p", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"];

/**
 * Grid neighbor map
 */
var g_neighbor = [
    [1, 4],
    [0, 2, 5],
    [1, 3, 6],
    [2, 7],
    [0, 5, 8],
    [1, 4, 6, 9],
    [2, 5, 7, 10],
    [3, 6, 11],
    [4, 9, 12],
    [5, 8, 10, 13],
    [6, 9, 11, 14],
    [7, 10, 15],
    [8, 13],
    [9, 12, 14],
    [10, 13, 15],
    [11, 14]
];

/**
 * Where is the movable grid.
 */
var g_space;

/**
 * Problem setting.
 */
var g_init = [15, 6, 2, 3, 4, 5, 0, 7, 8, 9, 10, 11, 12, 13, 14, 1];

/**
 * Current state
 */
var g_data;

/**
 * Solution record
 */
var g_solution = [];

$(function() {
	$("#Reset").click(reset);
	$("#Regret").click(regret);
	$("#Regret").attr("disabled", "disabled");
	initData();
	setupPuzzle();
});

function initData() {
	g_data = g_init.slice();
	for (var i=0; i<16; i++) {
		if (g_data[i]==0) g_space = i;
	}
	g_solution.length = 0;
}

function setupPuzzle() {
	var table = $("#Puzzle");
	for (var i=0; i<4; i++) {
		var row = $("<tr>").appendTo(table);
		for (var j=0; j<4; j++) {
			var k = g_data[4*i+j];
			var	cell = $("<td>").appendTo(row);
			
			var image = $("<image src='images/" + g_images[k] + ".png' id='p" + (4*i+j) + "'>")
				.click(move)
				.appendTo(cell);
		}	
	}
}

function reset() {
	initData();
	updateCount();
	for (var i=0; i<16; i++) setImage(i);
}

function regret() {
	if (g_solution.length == 0) return;
	
	var pos = g_solution.pop();
	if (g_solution.length == 0) $("#Regret").attr("disabled", "disabled");
	
	swap(pos, g_space);
	g_space = pos;
	
	updateCount();
}

function move() {
	var pos = parseInt( $(this).attr("id").substr(1) );
	if (!canMove(pos)) return;
	
	swap(pos, g_space);
	g_solution.push(g_space);
	g_space = pos;
	
	updateCount();
	
	$("#Regret").attr("disabled", "");
	checkEnd();
}

function swap(from, to) {
	var t = g_data[from];
	g_data[from] = g_data[to];
	g_data[to] = t;
	
	setImage(from);
	setImage(to);
}

function updateCount() {
	$("#StepCount").text(g_solution.length);
}

function checkEnd() {
	for (var i=0; i<16; i++) if (g_data[i]!=i) return;
	alert("Congratulations! You solved it.");
	
	var div = $("#Solution");
	div.empty();
	
	$("<p>Your solution (" + g_solution.length + " steps): </p>").appendTo(div);
	var solution = "<p>";
	for (var i=0; i<g_solution.length; i++) {
		solution += g_solution[i] + ", ";
	}
	solution += g_space + "</p>";
	$(solution).appendTo(div);
	
	$("#Solution").show();
}

function setImage(pos) {
	$("#p" + pos).attr("src", "images/" + g_images[g_data[pos]] + ".png");
}

function canMove(pos) {
	for (var i=0; i<g_neighbor[pos].length; i++) {
		if (g_neighbor[pos][i] == g_space) return true;
	}
	return false;
}