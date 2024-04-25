var manager = managerControl();

function returnLifeArr(name, type, start, end) {
	return {
		name, type, start, end
	};
}

// var l1 = returnLifeArr(
// 	"Douglas Adams",
// 	"literature",
// 	195203,
// 	200105
// );
var l1 = returnLifeArr(
	"Teste",
	"test",
	188101,
	188312
);
var l2 = returnLifeArr(
	"Albert Einstein",
	"science",
	187903,
	195504
);

var Initialize = () => {
	manager.add(l1);
	manager.add(l2);
	manager.refresh();
};

$(document).ready(Initialize);
