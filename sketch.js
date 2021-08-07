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

/*color array is colorGrid, posted in this format: 

0: {color: "5", id: "0x1"}
1: {color: "1", id: "0x10"}
2: {color: "5", id: "0x11"}
3: {color: "4", id: "0x12"}
4: {color: "3", id: "0x13"}
5: {color: "2", id: "0x14"}
6: {color: "5", id: "0x2"}
7: {color: "3", id: "0x3"}
8: {color: "4", id: "0x4"}
9: {color: "2", id: "0x5"}
10: {color: "5", id: "0x6"}
11: {color: "0", id: "0x7"}
12: {color: "2", id: "0x8"}
13: {color: "5", id: "0x9"}
14: {color: "1", id: "0xa"}
15: {color: "7", id: "0xb"}
16: {color: "4", id: "0xc"}
17: {color: "2", id: "0xd"}
18: {color: "2", id: "0xe"}
19: {color: "3", id: "0xf"}

so colorGrid[0] would be {color: "5", id: "0x1"}

sorting on next push sorry chuby
*/

async function setup() {
	await ethereum.request({ method: "eth_requestAccounts" });
	PROVIDER = new ethers.providers.Web3Provider(window.ethereum);
	SIGNER = PROVIDER.getSigner();
	let ABI = await fetch("assets/abi/OnePixel.json").then((e) => e.json());
	CONTRACT = new ethers.Contract(CONTRACT_ADDRESS, ABI, SIGNER);
	let supply = await CONTRACT.totalSupply();
	supply = parseInt(supply._hex);
	colors_to_fill = [];
	for (let i = 1; i < supply; i++) {
		let color = await CONTRACT.colorOf(i);
		colors_to_fill.push(parseInt(color));
	}
	console.log(colors_to_fill);
	createCanvas(320, 320);
	background(50);
	let counter = 1;
	for (let i = 0; i < 32; i++) {
		for (let j = 0; j < 32; j++) {
			let color = colors_to_fill[counter]
				? colors[colors_to_fill[counter]]
				: "black";
			console.log(i, j, color);
			noStroke();
			rect(0 + i * 10, 0 + j * 10, 10, 10);
			fill(color);
			counter++;
		}
	}
}
function draw() {
	//let color = colors[~~(Math.random() * colors.length)]
	//fill(color)
	//rect(0 + (i*10), 0 + (j*10), 10, 10);
}
