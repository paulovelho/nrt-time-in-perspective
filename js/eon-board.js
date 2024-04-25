class EonBoard {

	constructor() {
		this.container = "#eon-board";
		this.yearWidth = configs.yearWidth;
		this.lifes = [];
	}

	log = (val, data) => {
		console.info("EONboard: " + val, data);
	}
	addLife = (life) => {
		this.lifes.push(life);
	}

	refresh = () => {
		this.log("refreshing", this.lifes);
		this.calculateInterval();
		this.buildYears();
		this.populate();
	}

	calculateInterval = () => {
		let begin = null;
		let finish = null;
		this.lifes.forEach((l) => {
			if(begin == null || l.bornYear < begin) begin = l.bornYear;
			if(finish == null || l.deathYear > finish) finish = l.deathYear;
		});
		this.yearStart = begin - 1;
		this.yearEnd = finish + 2;
	}

	populate = () => {
		this.lifes.forEach((life, index) => this.includeLife(life, index));
	}
	includeLife = (life, index) => {
		let container = $(this.container + " .lifes");
		let lifeSpan = this.createLifeSpan(life);
		let margin = configs.lifeHeight + 2;
		let yearsBegin = life.bornYear - this.yearStart;
		let left = (yearsBegin * this.yearWidth) + life.getMonthMargin();
		lifeSpan.css({width: life.getWidth(), height: configs.lifeHeight });
		lifeSpan.css("margin-top", margin * index);
		lifeSpan.css("margin-left", left);
		$(container).append(lifeSpan);
	}
	createLifeSpan = (life) => {
		let $life = $(document.createElement('span'));
		$life.addClass('life').html(life.name);
		return $life;
	}

	buildYears = () => {
		let container = $(this.container + " .years");
		for (let i = this.yearStart; i < this.yearEnd; i++) {
			$(container).append(this.createYearSpan(i));
		}
	}
	createYearSpan = (year) => {
		let $span = $(document.createElement('span'));
		$span.addClass('year').html(year);
		$span.css({ height: 200, width: this.yearWidth });
		return $span;
	}

}
