var PROVIDER, SIGNER, CONTRACT;
var CONTRACT_ADDRESS = "0x93f5813b47F02157CF53B3a294746c95F6098948";

async function changeColor(){
    await ethereum.request( {method:"eth_requestAccounts"} );
    PROVIDER = new ethers.providers.Web3Provider( window.ethereum )
    SIGNER = PROVIDER.getSigner()
    let ABI = await fetch( "assets/abi/OnePixel.json" ).then( e=>e.json() )
    CONTRACT = new ethers.Contract( CONTRACT_ADDRESS, ABI,  SIGNER);
    let token = parseInt(document.getElementById("tokenIdInput").value)
    let color = document.getElementById("selectedColor").value
    //console.log(color)
    //await CONTRACT.bulkBuy(amount, {value:String(amount * 50000000000000000), gasLimit: 50000})
    await CONTRACT.changeColor(token, color)
}
