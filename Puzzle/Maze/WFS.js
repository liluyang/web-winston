/**
 * Width-First-Search solution to Maze
 */

var WFS = window.WFS || {
	m_steps : null, 
	m_index : null, 
	m_solution : null,

	solve : function() {
		this.m_steps = [];
		this.m_index = 0;
		
		var cur = {
				x : 0,
				y : 0,
				parent : -1
		};
		this.m_steps.push(cur);
		
		while (true) {
			var cell = getCell(cur.x, cur.y);
			if (!cell.hasClass("left") && this.testMove(cur.x-1, cur.y)) break;
			if (!cell.hasClass("right") && this.testMove(cur.x+1, cur.y)) break;
			if (!cell.hasClass("top") && this.testMove(cur.x, cur.y-1)) break;
			if (!cell.hasClass("bottom") && this.testMove(cur.x, cur.y+1)) break;
			this.m_index++;
			cur = this.m_steps[this.m_index];
		}
		
		this.showSolution();
	},

	testMove : function(x, y) {
		if (!isValidMove(x, y) || this.hasVisited(x, y)) return false;
		this.m_steps.push({
			x : x,
			y : y,
			parent : this.m_index
		});
		return x==g_N-1 && y==g_N-1;
	},

	hasVisited : function(x, y) {
		for (var i=0; i<this.m_steps.length; i++) {
			if (this.m_steps[i].x == x && this.m_steps[i].y == y) return true;
		}
		return false;
	},

	showSolution : function() {
		var index = this.m_index;
		this.m_solution = [{ x:g_N-1, y:g_N-1}];
		
		do {
			this.m_solution.push({
				x : this.m_steps[index].x, 
				y : this.m_steps[index].y
			});
			index = this.m_steps[index].parent;
		} while (index >= 0);
		
		this.m_solution.reverse();
		this.showMove(0);
	},

	showMove : function(step) {
		var x = this.m_solution[step].x,
			y = this.m_solution[step].y;
		moveBall(x, y);
		getCell(x, y).addClass("solved");
		if (step+1 < this.m_solution.length) setTimeout(function() { WFS.showMove(step+1); }, 100);
	}
}