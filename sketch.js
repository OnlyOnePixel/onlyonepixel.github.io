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

async function setup() {
	createCanvas(320, 320);
}
function draw() {
	if(colorGrid){
		if(colorGrid.length == 1024){
			let counter = 0;
			for (let i = 0; i < 32; i++) {
				for (let j = 0; j < 32; j++) {
					//console.log(colors[colorGrid[counter]['color']])
					let color = colors[colorGrid[counter]['color']]
						? colors[colorGrid[counter]['color']]
						: "black";
					//console.log(i, j, color);
					noStroke();
					fill(color);
					rect(0 + (i * 10), 310-(0 + (j * 10)), 10, 10);
					counter++;
				}
			}
		}
	}
}
