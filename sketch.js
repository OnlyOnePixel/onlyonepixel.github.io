var colors = [
	"#000000",
	"#ffffff",
	"#2E2C9B",
	"#813338",
	"#56AC4D",
	"#EDF171",
	"#8E3C97",
	"#75CEC8",
];

function setup() {
	createCanvas(320, 320);
	background(50);
	for(let i = 0; i < 32; i++){
		for(let j = 0; j < 32; j++){
			let color = "grey"
			fill(color)
			rect(0 + (i*10), 0 + (j*10), 10, 10);		
		}
	}
}
function draw() {
	//let color = colors[~~(Math.random() * colors.length)]
	//fill(color)
	//rect(0 + (i*10), 0 + (j*10), 10, 10);		
}

