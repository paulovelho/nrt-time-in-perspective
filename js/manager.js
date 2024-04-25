var managerControl = () => {

	this.board = new EonBoard();
	this.addLife = (lifeArr) => {
		let l = new Life(
			lifeArr['name'],
			lifeArr['type'],
			lifeArr['start'],
			lifeArr['end']
		);
		console.info("adding ", l);
		console.info("months: ", l.ageInMonths());
		this.board.addLife(l);
	};

	return {
		add: (lifeArr) => {
			this.addLife(lifeArr);
		},
		refresh: this.board.refresh,
	}
};
