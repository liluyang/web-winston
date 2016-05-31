var g_N = 8;

var g_walls = [];

var g_sets = [];

var g_pos = {
	x : 0,
	y : 0
};

$(function() {
	$("#NewGame").click(newGame);
	$("#Level").val(g_N);
	$("#Level").change(changeLevel);
	$(document).keydown(keyHandler);
	newGame();
});

/*****************************************************************************
 * Event handling
 *****************************************************************************/

function keyHandler(evt) {
	switch (evt.keyCode) {
	case 37:		// LEFT
		if (!getCell().hasClass("left")) moveTo(g_pos.x-1, g_pos.y);
		break;
	case 38:		// UP
		if (!getCell().hasClass("top")) moveTo(g_pos.x, g_pos.y-1);
		break;
	case 39:		// RIGHT
		if (!getCell().hasClass("right")) moveTo(g_pos.x+1, g_pos.y);
		break;
	case 40:		// DOWN
		if (!getCell().hasClass("bottom")) moveTo(g_pos.x, g_pos.y+1);
		break;
	case 83:		// s = Width First Search
		WFS.solve();
		break;
	case 68:		// d = Depth First Search
		DFS.solve();
		break;
	}
	evt.stopPropagation();
}

function moveTo(x, y) {
	if (!isValidMove(x, y)) return;
	var fromCell = getCell(),
		toCell = getCell(x, y);
	
	moveBall(x, y);
	
	if (toCell.hasClass("visited")) {
		fromCell.removeClass("visited");
	}
	else {
		$("<img src='" + g_N + "t.png'>").appendTo(fromCell);
		fromCell.addClass("visited");
	}
	
	toCell.removeClass("visited");
	
	if (x==g_N-1 && y==g_N-1) {
		alert("Great move! You did it.");
	}
}

function isValidMove(x, y) {
	return x>=0 && x<g_N && y>=0 && y<g_N;	
}

function moveBall(x, y) {
	getCell().empty();
	g_pos.x = x;
	g_pos.y = y;
	
	var toCell = getCell();
	toCell.empty();
	$("<img src='" + g_N + ".png'>")
		.css("vertical-align", "middle")
		.appendTo(toCell);
}

function changeLevel() {
	g_N = parseInt($("#Level").val());
	newGame();
}


/*****************************************************************************
 * New Game
 *****************************************************************************/

function newGame() {
	$("#MazeTable").empty();
	$("#Level").trigger("blur");
	setTimeout(drawMaze, 100);
}

function drawMaze() {
	var table = $("#MazeTable");
	var size = Math.floor(480/g_N)-1;
	
	for (var y=0; y<g_N; y++) {
		var row = $("<tr>").appendTo(table);
		for (var x=0; x<g_N; x++) {
			var cell = $("<td id='m" + x + "_" + y + "' width='" + size + "' height='" + size + "'></td>")
				.appendTo(row);
			cell.addClass("top");
			cell.addClass("bottom");
			cell.addClass("left");
			cell.addClass("right");
		}
	}
	
	generateMaze();
}

function generateMaze() {
	g_walls.length = [];
	g_sets.length = [];
	
	for (var i=0; i<g_N; i++) {
		for (var j=0; j<g_N; j++) {
			g_sets.push([i + j*g_N]);
		}
		
		for (var j=0; j<g_N-1; j++) {
			g_walls.push({
				x : i,
				y : j,
				type : "v"
			});
			g_walls.push({
				y : i,
				x : j,
				type : "h"
			});
		}
	}	
	
	findSpanTree();
	remove(0, 0, "left");
	remove(g_N-1, g_N-1, "right");
	
	moveBall(0, 0);
}

/*****************************************************************************
 * Use Minimum Spanning Tree algorithm to generate maze.
 *****************************************************************************/

function findSpanTree() {
	while (g_sets.length > 1) {
		var index = Math.floor( Math.random() * g_walls.length );
		var wall = g_walls.splice(index, 1)[0];
		breakWall(wall);
	}
}

function breakWall(wall) {
	if (wall.type == "v") {
		if ( connect(wall.x, wall.y, wall.x, wall.y+1) ) {
			remove(wall.x, wall.y, "bottom");
			remove(wall.x, wall.y+1, "top");
		}
	}
	else {
		if ( connect(wall.x, wall.y, wall.x+1, wall.y) ) {
			remove(wall.x, wall.y, "right");
			remove(wall.x+1, wall.y, "left");
		}
	}
}

function remove(x, y, className) {
	getCell(x, y).removeClass(className);
}

function getCell(x, y) {
	if (x == undefined) x = g_pos.x;
	if (y == undefined) y = g_pos.y;
	return $("#m" + x + "_" + y);
}

function connect(x1, y1, x2, y2) {
	var index1 = findSet(x1, y1);
	var index2 = findSet(x2, y2);
	if (index1 == index2) return false;
	
	$.merge(g_sets[index1], g_sets[index2]);
	g_sets.splice(index2, 1);
	return true;
}

function findSet(x, y) {
	var n = x + y*g_N;
	for (var i=0; i<g_sets.length; i++) {
		for (var j=0; j<g_sets[i].length; j++) {
			if (g_sets[i][j] == n) return i;
		}
	}
	alert("Error to build maze!");
	return -1;
}