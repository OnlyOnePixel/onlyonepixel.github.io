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
	if (colorGrid) {
		if (colorGrid.length == 1024) {
			let counter = 0;
			for (let i = 0; i < 32; i++) {
				for (let j = 0; j < 32; j++) {
					//console.log(colors[colorGrid[counter]['color']])
					let color = colors[colorGrid[counter]["color"]]
						? colors[colorGrid[counter]["color"]]
						: "black";
					//console.log(i, j, color);
					noStroke();
					fill(color);
					let xCoord = 0 + i * 10;
					let yCoord = 310 - (0 + j * 10);

					rect(xCoord, yCoord, 10, 10);

					counter++;
				}
			}
			fill(255);

			if (mouseX > width - 100) {
				mouseX -= 200;
			}
			if (mouseY > height - 25) {
				mouseY -= 25;
			}

			if (mouseX < 0) {
				mouseX += 100;
			}
			if (mouseY < 0) {
				mouseY += 25;
			}
			rect(mouseX, mouseY - 25, 200, 50);
			fill(0);
			let Cx = round(mouseX / 10);
			let Cy = 32 - round(mouseY / 10);
			let tokenID = Cx * 32 + Cy + 1;
			text(
				"Token ID: " +
					tokenID +
					"\nCoordinates: (" +
					Cx +
					", " +
					Cy +
					")",
				mouseX,
				mouseY
			);
		}
	}
}
