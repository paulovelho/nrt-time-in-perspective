var manager = managerControl();
var lifes = lifeManager();

function returnLifeArr(name, type, start, end) {
	return {
		name, type, start, end
	};
}

var Initialize = () => {
	lifes.loadAll()
		.then((rs) => {
			let data = lifes.limitYears(1938, 1945).filter();
			// let data = lifes.filter();
			console.info(data);
			data.map((life) => manager.addLife(life));
		})
		.then(() => manager.refresh());

};

$(document).ready(Initialize);
