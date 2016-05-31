var DFS = window.DFS || {
	m_steps 	: null,
	
	m_timeout	: 50,
	
	solve : function() {
		this.m_steps = [];
		this.next(0, 0, 0);
	},
	
	search : function() {
		var cur = DFS.getCurrent(),
			cell = getCell(cur.x, cur.y);
		if (cur.direction.length > 0) {
			switch(cur.direction.shift()) {
			case 0:		// RIGHT
				if (!cell.hasClass("right") && isValidMove(cur.x+1, cur.y)) {
					DFS.next(cur.x+1, cur.y, 0);
				}
				else {
					DFS.search();
				}
				break;
			case 1:		// DOWN
				if (!cell.hasClass("bottom") && isValidMove(cur.x, cur.y+1)) {
					DFS.next(cur.x, cur.y+1, 1);
				}
				else {
					DFS.search();
				}
				break;
			case 2:		// UP
				if (!cell.hasClass("top") && isValidMove(cur.x, cur.y-1)) {
					DFS.next(cur.x, cur.y-1, 2);
				}
				else {
					DFS.search();
				}
				break;
			case 3:		// LEFT
				if (!cell.hasClass("left") && isValidMove(cur.x-1, cur.y)) {
					DFS.next(cur.x-1, cur.y, 3);
				}
				else {
					DFS.search();
				}
				break;
			}
		}
		else {		// backtrack
			DFS.m_steps.pop();
			getCell(cur.x, cur.y).removeClass("solved");
			
			cur = DFS.getCurrent();
			moveBall(cur.x, cur.y);
			setTimeout(DFS.search, DFS.m_timeout);
		}
	},
	
	found : function() {
		var cur = this.getCurrent();
		return cur.x == g_N-1 && cur.y == g_N-1;
	},
	
	getCurrent : function() {
		return this.m_steps[this.m_steps.length - 1];
	},
	
	next : function(x, y, direction) {
		var set = [0, 1, 2, 3];
		set.splice(3-direction, 1);
		
		this.m_steps.push({
			x 			: x,
			y 			: y,
			direction 	: set
		});
		
		moveBall(x, y);
		getCell(x, y).addClass("solved");
		
		if (!DFS.found()) setTimeout(DFS.search, DFS.m_timeout);
	}
}