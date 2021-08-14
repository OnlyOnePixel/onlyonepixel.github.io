var PROVIDER, SIGNER, CONTRACT;
var CONTRACT_ADDRESS = "0x93f5813b47F02157CF53B3a294746c95F6098948";

async function connect(){
	await ethereum.request( {method:"eth_requestAccounts"} );
	PROVIDER = new ethers.providers.Web3Provider( window.ethereum )
    SIGNER = PROVIDER.getSigner()
    let ABI = await fetch( "assets/abi/OnePixel.json" ).then( e=>e.json() )
    CONTRACT = new ethers.Contract( CONTRACT_ADDRESS, ABI,  SIGNER);
    if(SIGNER){
        let address = await SIGNER.getAddress()
//        Signed in as: <a href="#login">0xff</a>
        document.getElementById("account-name").innerHTML = "Signed in as: <a href=\"https://opensea.io/" + address + "\">" + address.substring(0,7) + "</a>"

    }
}
