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
	await ethereum.request( {method:"eth_requestAccounts"} );
	PROVIDER = new ethers.providers.Web3Provider( window.ethereum )
    SIGNER = PROVIDER.getSigner()
    let ABI = await fetch( "assets/abi/OnePixel.json" ).then( e=>e.json() )
    CONTRACT = new ethers.Contract( CONTRACT_ADDRESS, ABI,  SIGNER);
    let supply = await CONTRACT.totalSupply()
	supply = parseInt(supply._hex)
	colors_to_fill = []
	for(let i = 1; i<supply; i++){
		let color = await CONTRACT.colorOf(i);
		colors_to_fill.push(parseInt(color))
	}
	console.log(colors_to_fill)
	createCanvas(320, 320);
	background(50);
	let counter = 1
	for(let i = 0; i < 32; i++){
		for(let j = 0; j < 32; j++){
			let color = colors_to_fill[counter] ? colors[colors_to_fill[counter]] : "black"
			console.log(i, j, color)
			noStroke()
			rect(0 + (i*10), 0 + (j*10), 10, 10);	
			fill(color)
			counter++	
		}
	}
}
function draw() {
	//let color = colors[~~(Math.random() * colors.length)]
	//fill(color)
	//rect(0 + (i*10), 0 + (j*10), 10, 10);		
}

