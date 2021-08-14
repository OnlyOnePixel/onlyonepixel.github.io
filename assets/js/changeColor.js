async function changeColor(){
    let token = parseInt(document.getElementById("tokenIdInput").value)
    let color = document.getElementById("selectedColor").value
    await CONTRACT.changeColor(token, color, {gasLimit: 50000})
}
