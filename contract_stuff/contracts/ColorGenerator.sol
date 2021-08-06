// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

library ColorGenerator {

    struct Color {
		uint256 id;
    }

    function random(Color storage g) internal returns (uint256) {
		g.id = uint256(keccak256(abi.encode(keccak256(abi.encodePacked(gasleft(), block.timestamp))))) % 8;
		return g.id;
    }

}
