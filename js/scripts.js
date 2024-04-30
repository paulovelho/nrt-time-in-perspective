var configs = { 
	yearWidth: 24,
	yearHeight: 50,
	lifeHeight: 30,
};

function toggleCompact() {
	if(configs.yearWidth == 24) {
		configs.yearWidth = 14;
	} else {
		configs.yearWidth = 24;
	}
	window.manager.refresh();
}

function filterYears() {
	let begin = $("#year-begin").val();
	let end = $("#year-end").val();
	if(!begin || !end) return;
	begin = +begin; end = +end;
	console.info("filtering ("+begin+"-"+end+")");
	window.lifes.limitYears(begin, end);
	window.manager
		.clear();
	window.manager
		.highlightYears(begin, end)
		.addArray(window.lifes.filter());
}
