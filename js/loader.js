window.manager = managerControl();
window.lifes = lifeManager();

function returnLifeArr(name, type, start, end) {
	return {
		name, type, start, end
	};
}

var Initialize = () => {
	window.lifes.loadAll()
		.then((rs) => {
			let data = window.lifes
				.filter();
			data.map((life) => window.manager.addLife(life));
		})
		.then(() => window.manager.refresh());

};

$(document).ready(Initialize);
