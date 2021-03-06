async function main(){
    await getColors()
    await connect()
    if(SIGNER){
        let address = await SIGNER.getAddress()
        document.getElementById("account-name").innerHTML = "Signed in as: <a href=\"https://opensea.io/" + address + "\">" + address.substring(0,7) + "</a>"
        let pxlBalance = await CONTRACT.balanceOf(address);
        if(pxlBalance > 0){
            document.getElementById('colorChanger').style.display = '';
            await fillDropdown()          
        }
    }

}