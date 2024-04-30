var managerControl = () => {

	this.board = new EonBoard();
	this.addLife = (lifeArr) => {
		let l = new Life(
			lifeArr['name'],
			lifeArr['type'],
			lifeArr['start'],
			lifeArr['end']
		);
		this.board.addLife(l);
	};
	this.highlight = (years) => {
		console.info("highlighting ", years);
		const arr = Array.from({length: years[1] - years[0] + 1}, (_, i) => i + years[0]);
		this.board.highlightYears(arr);
	};
	this.clear = () => {
		this.board.removeAll();
		return this;
	};
	this.addArray = (arr) => {
		arr.map(life => this.board.addLife(life));
		this.board.refresh();
	};

	return {
		highlightYears: (begin, end) => { 
			this.highlight([begin, end].sort());
			return this;
		},
		add: (lifeArr) => {
			this.addLife(lifeArr);
		},
		addLife: this.board.addLife,
		addArray: this.addArray,
		clear: () => { this.clear(); return this; },
		refresh: () => { 
			this.board.refresh();
		}
	}
};
