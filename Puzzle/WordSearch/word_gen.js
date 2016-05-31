var MAXIMUM_TRY = 20;

var g_dict;
var g_data;
var g_picked;

function loadDict() {
	$.get("english_word.txt", 
			function(dict) {
				g_dict = dict.split("\n");
				for (var i=0; i<g_dict.length; i++) g_dict[i] = $.trim(g_dict[i]);
				newPuzzle();
			},
			"text"
	);
	
	// Initialize for Nov 1, 2010
	$("#InputWords").val("five, six, seven, eight, nine, small, wall, bay, day, may");
}

function newPuzzle() {
	g_data = [];
	g_picked = [];
	initData();
	initWords();
	fillBlanks();
	
	updateWordTable();
	updateWordList();
}

function initData() {
	for (var i=0; i<g_grid; i++) {
		var a = [];
		for (var j=0; j<g_grid; j++) {
			a.push("");
		}
		g_data.push(a);
	}
}

function initWords() {
	var words = $("#InputWords").val().split(",");
	for (var i=0; i<words.length; i++) {
		var word = $.trim(words[i]);
		if (word.length > 0) fitInWord(word);
	}
}

function fitInWord(word) {
	for (var i=0; i<MAXIMUM_TRY; i++) {
		var x = randomInt(g_grid);
		var y = randomInt(g_grid);
		
		var startDirection = randomInt(8);
		for (var j=0; j<8; j++) {
			var direction = (startDirection + j)%8;
			if (testDirection(x, y, word, direction)) {
				g_picked.push(word);
				return; 
			}
		}
	}
}

function testDirection(x, y, word, direction) {
	var dx;
	var dy;
	
	switch(direction) {
	case 0:		// north
		dx = 0;
		dy = -1;
		break;
	
	case 1:		// northeast
		dx = 1;
		dy = -1;
		break;
		
	case 2:		// east
		dx = 1;
		dy = 0;
		break;
		
	case 3:		// southeast
		dx = 1;
		dy = 1;
		break;
		
	case 4:		// south
		dx = 0;
		dy = 1;
		break;
		
	case 5:		// southwest
		dx = -1;
		dy = 1;
		break;
		
	case 6:		// west
		dx = -1;
		dy = 0;
		break;
		
	default:	// northwest
		dx = -1;
		dy = -1;
	}
	
	var endx = x + word.length*dx;
	var endy = y + word.length*dy;
	
	if (endx < 0 || endx >= g_grid || endy < 0 || endy >= g_grid) return false;
	
	for (var i=0; i<word.length; i++) {
		var c = g_data[x + i*dx][y + i*dy];
		if (c!="" && c!=word.charAt(i)) {
			return false;
		}
	}
	
	for (var i=0; i<word.length; i++) {
		g_data[x+dx*i][y+dy*i] = word.charAt(i);
	}
	return true;
}

function fillBlanks() {
	for (var i=0; i<g_grid; i++) {
		for (var j=0; j<g_grid; j++) {
			if (g_data[i][j] == "") {
				g_data[i][j] = randomChar();
			}
		}
	}
}

function randomChar() {
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var num = randomInt(chars.length);
	return chars.substring(num,num+1);
}

function randomWord() {
	var word = g_dict[randomInt(g_dict.length)];
	for (var i=0; i<g_picked.length; i++) {
		if (g_picked[i] == word) return randomWord();
	}
	return word;
}

function randomInt(max) {
	return Math.floor(Math.random() * max);
}