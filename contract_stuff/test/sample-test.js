const { expect } = require("chai");

describe("OnlyOne Tests", function () {
  it("Full Coverage", async function () {
    const OnlyOne = await ethers.getContractFactory("OnePixel");
    const onlyOne = await OnlyOne.deploy("https://api.com/");
    await onlyOne.deployed();

    const tx = await onlyOne.bulkBuy(10, {value: (50000000000000000 * 10).toString()});
    await tx.wait();        

    expect(await onlyOne.tokenURI(1)).to.equal("https://api.com/1");
    var color = parseInt(await onlyOne.colorOf(1))
    expect(color).to.be.greaterThanOrEqual(0);
    expect(color).to.be.lessThanOrEqual(7);
    await onlyOne.changeColor(1, 3);
    color = parseInt(await onlyOne.colorOf(1))
    expect(color).to.equal(3);
  });
});
