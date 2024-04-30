var lifeManager = () => {

	this.types = ["science", "events", "arts", "politics"];
	this.years = [];
	this.lifes = [];
	this.log = (val, data) => {
		console.info("lifeManager: " + val, data);
	};

	this.allLifes = () => {
		let all = [];
		for (const [key, value] of Object.entries(this.lifes)) {
			let data = Object.keys(value).map((key) => value[key]);
			all = all.concat(data);
		}
		return all;
	}
	this.loadData = (category) => {
		let file = "js/data/"+category+".json";
		return new Promise((resolve, reject) => {
			fetch(file)
				.then(rs => rs.json())
				.then((data) => {
					let lifes = {};
					for (const [key, value] of Object.entries(data)) {
						lifes[key] = new Life(value[0], category, value[1], value[2]);
					}
					this.lifes[category] = lifes;
					return lifes;
				})
				.then((rs) => {
					return Object.entries(rs).map((l) => l[1]);
				})
				.then(resolve)
				.catch(reject);
		})
	};
	this.limitYears = (data) => {
		if(this.years.length < 2) return data;
		let begin = this.years[0];
		let end = this.years[1];
		data = data.filter((l) => { return l.bornYear < end });
		data = data.filter((l) => { return l.deathYear > begin; });
		return data;
	};
	this.filter = () => {
		let data = this.allLifes();
		return this.limitYears(data);
	};

	return {
		limitYears: (begin, end) => {
			this.years = [begin, end].sort();
			return this;
		},
		filter: this.filter,
		loadAll: () => {
			let loaders = this.types.map((t) => this.loadData(t));
			return Promise.all(loaders).then(rs => rs.flat());
		},
	}
};
