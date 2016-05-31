var g_grid = 12;
var g_puzzle;
var g_count;

$(function() {
	$("#NewQuiz").click(newPuzzle);
	$("#Level").change(changeLevel);
	loadDict();
});

function changeLevel() {
	g_grid = parseInt($("#Level").val());
	newPuzzle();
}

function updateWordTable() {
	var table = $("#WordTable");
	table.empty();
	
	var width = 100/g_grid + "%";
	
	for (var i=0; i<g_grid; i++) {
		var row = $("<tr>").appendTo(table);
		
		for (var j=0; j<g_grid; j++) {
			var cell = $("<td width='" + width + "'>").appendTo(row);
			cell.text(g_data[i][j]);
			cell.click(function() {
				$(this).toggleClass("selected");
				checkWord();
			});
			
			$.data(cell[0], "y", i);
			$.data(cell[0], "x", j);
		}
	}
}

function updateWordList() {
	var list = $("#WordList");
	list.empty();
	
	for (var i=0; i<g_picked.length; i++) {
		$("<li>" + g_picked[i] + "</li>").appendTo(list);
		g_count++;
	}
	
	g_count = g_picked.length;
}

function checkWord() {
	var word = "";
	$("#WordTable .selected").each(function() {
		word += $(this).text();
	});
	var reverse = word.split("").reverse().join("");
	
	$("#WordList LI:not(.found)").each(function() {
		var text = $(this).text();
		
		if (findMatch(word, reverse, text)) {
			$(this).addClass("found");
			$("#WordTable .selected").addClass("found").removeClass("selected");
			
			if ($("#WordList .found").size() == g_count) {
				$("#Award").dialog();
			}
		}
	});
}

function findMatch(word, reverse, text) {
	if (word != text && reverse != text) return false;
	var x = [];
	var y = [];
	$("#WordTable .selected").each(function() {
		x.push($.data(this, "x"));
		y.push($.data(this, "y"));
	});
	
	if (x.length < 3) return true;
	
	var dx = x[1] - x[0];
	var dy = y[1] - y[0];
	
	for (var i=2; i<x.length; i++) {
		if (x[i] != x[0] + dx*i || y[i] != y[0] + dy*i) return false; 
	}
	
	return true;
}
