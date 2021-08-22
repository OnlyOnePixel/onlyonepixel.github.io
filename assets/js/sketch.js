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

var isValid = false
var tokenID, targetMatchCounter;

async function setup() {
	createCanvas(320, 320);
}

function draw() {
	if (colorGrid) {
		if (colorGrid.length == 1024) {
			let counter = 0;
			targetMatchCounter = 0;

			for (let i = 0; i < 32; i++) {
				for (let j = 0; j < 32; j++) {
					if(colorGrid[counter]['color'] == 0){
						targetMatchCounter++;
					}
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
			document.getElementById("matches").innerHTML = "OnePixel Canvas";
//			document.getElementById("matches").innerHTML = String(targetMatchCounter) + "/1024 Black Pixels";
			let Cx = round(mouseX / 10);
			let Cy = 32 - round(mouseY / 10);
			let offsetX = 5
			let offsetY = - 20
			tokenID = Cx * 32 + Cy + 1;
			isValid = (Cx >= 0 && Cy >=0) && (Cx <= 31 && Cy <= 31)
			
			if(Cy >= 28) {
				offsetY += 55
			}
			
			if(Cx >= 19){
				offsetX -= 135
			}

			if(isValid) {
				fill(255);
				rect(mouseX + offsetX, mouseY + offsetY - 25, 130, 40);
				fill(0);
				text(
					" Token ID: " +
						tokenID +
						"\n Coordinates: (" +
						Cx +
						", " +
						Cy +
						")",
					mouseX + offsetX,
					mouseY + offsetY - 10
				);
			}

		}
	}
}

function mouseClicked() {
	if(isValid){
		window.open("https://opensea.io/assets/0x93f5813b47f02157cf53b3a294746c95f6098948/" + tokenID)
	}
}
