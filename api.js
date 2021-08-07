var PROVIDER, SIGNER, CONTRACT;
var CONTRACT_ADDRESS = "0xa46BEADDD73c5fd2FF60a1fd276319B718D89469";

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