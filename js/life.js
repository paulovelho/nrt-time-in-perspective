class Life {
	#yearWidth = configs.yearWidth;
	constructor(name, type, start, end) {
		this.name = name;
		this.type = type;
		this.rawStart = start;
		this.rawEnd = end;
		this.#initialize();
	}

	#initialize = () => {
		let born = this.#splitDate(this.rawStart);
		let death = this.#splitDate(this.rawEnd);
		this.bornYear = born.year;
		this.bornMonth = born.month;
		this.deathYear = death.year;
		this.deathMonth = death.month;
	}

	#splitDate = (date) => {
		if(date < 9999) { return { year: date, month: 1 }; }
		const year = Math.floor(date / 100);
		const month = date % 100;
		return { year, month };
	}

	getCaption = () => {
		let age = Math.floor(this.ageInMonths()/12);
		return this.name + " ("+this.bornYear+" - "+this.deathYear+", "+age+" anos)";
	}

	getWidth = () => {
		let months = this.ageInMonths();
		let monthSize = this.#yearWidth / 12;
		return (months * monthSize);
	}
	getMonthMargin = () => {
		let monthSize = this.#yearWidth / 12;
		return (this.bornMonth - 1) * monthSize;
	}

	ageInMonths = () => {
		let months = 13 - this.bornMonth;
		let years = (this.deathYear - 1) - (this.bornYear);
		months += (years * 12);
		months += this.deathMonth;
		return months;
	}
}

