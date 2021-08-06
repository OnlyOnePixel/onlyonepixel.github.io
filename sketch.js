const coordinates = [];

for (let i = 0; i < 32; i++) {
	for (let j = 0; j < 32; j++) {
		let p = [i, j];

		coordinates.push(p);
		// console.log(p);
	}
}

var colors = [
	"#0000db",
	"#00b6db",
	"#00db6d",
	"#ffb600",
	"#ff926d",
	"#db0000",
	"#dbdbdb",
	"#000000",
];

var colorCoordinatePair = {};
var a = colors;
for (let i = 0; i < coordinates.length; i++) {
	if (a.length > 0) {
		colorCoordinatePair[coordinates[i]] = a[0];
		a.shift();
	} else {
		a = colors;
		//console.log("colors reset");
	}
	//console.log(a);
}
console.log("Done iterating");
console.log(coordinates.length);

// for (let a = 0; a < coordinates.length; a++) {
// 	console.log(coordinates[a]);
// }

// console.log("test", colors);

console.log("color coordinate dictionary", JSON.stringify(colorCoordinatePair));

function setup() {
	createCanvas(320, 320);
	background(50);
}
function draw() {
	fill(225);
	rect(50, 50, 50, 50);
}
