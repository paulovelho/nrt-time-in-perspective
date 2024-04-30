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
		const arr = Array.from({length: years[1] - years[0] + 1}, (_, i) => i + years[0]);
		this.board.highlightYears(arr);
	}

	return {
		highlightYears: (begin, end) => { this.highlight([begin, end].sort()); return this; },
		add: (lifeArr) => {
			this.addLife(lifeArr);
		},
		addLife: this.board.addLife,
		refresh: this.board.refresh,
	}
};
