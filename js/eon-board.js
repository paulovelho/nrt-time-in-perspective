class EonBoard {

	constructor() {
		this.container = "#eon-board";
		this.yearWidth = configs.yearWidth;
		this.lifes = [];
		this.highlight = [];
	}

	log = (val, data) => {
		// console.info("EONboard: " + val, data);
	}
	addLife = (life) => {
		this.log("addding ", life);
		this.lifes.push(life);
	}

	refresh = () => {
		this.log("refreshing", this.lifes);
		this.clearBoard();
		this.yearWidth = configs.yearWidth;
		this.calculateInterval();
		this.buildYears();
		this.populate();
	}

	clearBoard = () => {
		$(this.container + " .lifes").empty();
		$(this.container + " .years").empty();
		$("#life-list").empty();
	}

	remove = (life) => {
		console.info("removing ", life);
		this.lifes = this.lifes.filter(l => l.name != life.name);
		this.refresh();
	}
	removeAll = () => {
		this.lifes = [];
		this.refresh();
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

	populatePanel = () => {
		let panelLifes = this.lifes;
		panelLifes.sort((a, b) => a.name.localeCompare(b.name));
		console.info(panelLifes);
		let container = $("#life-list");
		panelLifes.forEach((life, index) => {
			let chip = this.createLifeBadge(life, index);
			$(container).append(chip);
		});
	}
	createLifeBadge = (life, index) => {
		let removeBtn = $(document.createElement('button'));
		removeBtn.addClass('btn-close');
		removeBtn.click(() => this.remove(life));
		let $lifeChip = $(document.createElement('span'));
		$lifeChip.addClass('life-chip').addClass('badge').addClass(life.type);
		$lifeChip.html(life.name).append(removeBtn);
		return $lifeChip;
	}

	populate = () => {
		this.populatePanel();
		this.sortLifes();
		this.lifes.forEach((life, index) => this.includeLife(life, index));
		this.fixHeight();
	}
	sortLifes = () => {
		this.lifes.sort((a, b) => a.bornYear - b.bornYear);
	}
	fixHeight = () => {
		let height = configs.lifeHeight + 2;
		let totalH = height * this.lifes.length + configs.yearHeight;
		$(this.container).css({ height: totalH });
		$(".year").css({ height: totalH + 20 });
	}
	includeLife = (life, index) => {
		let container = $(this.container + " .lifes");
		let lifeSpan = this.createLifeSpan(life);
		let margin = configs.lifeHeight + 2;
		lifeSpan.css("margin-top", margin * index);
		$(container).append(lifeSpan);
	}
	createLifeSpan = (life) => {
		let w = life.getWidth();
		let h = configs.lifeHeight;
		let yearsBegin = life.bornYear - this.yearStart;
		let left = (yearsBegin * this.yearWidth) + life.getMonthMargin();

		let $lifeContainer = $(document.createElement('span'))
		$lifeContainer.addClass('life').addClass(life.type);
		$lifeContainer.css({width: w, height: h });
		$lifeContainer.css("margin-left", left);
		$lifeContainer.attr("title", life.getCaption());

		let $life = $(document.createElement('span'));
		$life.addClass('life-caption').html(life.name);
		$life.css({width: (w-4), height: (h-4) });
		$($lifeContainer).append($life);

		return $lifeContainer;
	}

	highlightYears = (years) => {
		this.highlight = years;
		console.info("highlighting ", years);
		return this;
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
		if(this.highlight.includes(year)) $span.addClass("highlight");
		$span.css({ height: configs.yearHeight, width: this.yearWidth });
		return $span;
	}

}
