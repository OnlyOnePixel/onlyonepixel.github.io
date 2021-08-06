var PROVIDER, SIGNER, CONTRACT;
var CONTRACT_ADDRESS = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

async function connect(){
	await ethereum.request( {method:"eth_requestAccounts"} );
	PROVIDER = new ethers.providers.Web3Provider( window.ethereum )
    SIGNER = PROVIDER.getSigner()
    let ABI = await fetch( "assets/abi/OnePixel.json" ).then( e=>e.json() )
    CONTRACT = new ethers.Contract( CONTRACT_ADDRESS, ABI,  SIGNER);
    let supply = await CONTRACT.totalSupply()
    document.getElementById("mintCount").innerHTML = "Minted: " + String(supply);
    document.getElementById("remainingCount").innerHTML = "Remaining: " + String(1024-supply);
    if(supply == 1024){
        document.getElementById("MintForm").style.visibility = "hidden"; 
    }
}