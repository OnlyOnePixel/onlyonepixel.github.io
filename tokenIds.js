var PROVIDER, SIGNER, CONTRACT;
var CONTRACT_ADDRESS = "0xa46BEADDD73c5fd2FF60a1fd276319B718D89469";

async function fillDropdown(){
    await ethereum.request( {method:"eth_requestAccounts"} );
	PROVIDER = new ethers.providers.Web3Provider( window.ethereum )
    SIGNER = PROVIDER.getSigner()
    let ABI = await fetch( "assets/abi/OnePixel.json" ).then( e=>e.json() )
    CONTRACT = new ethers.Contract( CONTRACT_ADDRESS, ABI,  SIGNER);
    let userAddress = await SIGNER.getAddress();
    let balance = await CONTRACT.balanceOf(userAddress)
    var select = document.getElementById("tokenIdInput");
    for(let i=balance-1; i >= 0; i--){
        var option = document.createElement('option');
        let tokenId = await CONTRACT.tokenOfOwnerByIndex(userAddress, i)
        option.text = option.value = tokenId;
        select.add(option, 0);
    }
}
