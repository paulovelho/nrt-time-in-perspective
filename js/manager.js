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

	return {
		add: (lifeArr) => {
			this.addLife(lifeArr);
		},
		addLife: this.board.addLife,
		refresh: this.board.refresh,
	}
};
