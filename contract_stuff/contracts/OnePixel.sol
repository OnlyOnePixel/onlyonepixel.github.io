pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ColorGenerator.sol";

contract OnePixel is ERC721Enumerable, ReentrancyGuard {
    using ColorGenerator for ColorGenerator.Color;
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    
    ColorGenerator.Color internal colorGenerator;

    Counters.Counter private _tokenIdTracker;
    uint256 public unftPrice = 50000000000000000;
    uint256 public maxSupply = 1024;
    uint256 public bulkBuyLimit = 10;
    uint256 public endColorChangeDate;
    address public deployerAddress;
    string private baseTokenURI;

    event TokenMinted(uint256 indexed tokenId, uint256 newColor);
    event ColorChanged(uint256 indexed tokenId, uint256 oldColor, uint256 newColor);

    mapping (uint256 => uint256) internal _colors;

    constructor(string memory _baseTokenURI, uint256 _endColorChangedate) ERC721("OnePixel", "OP") public {
        baseTokenURI = _baseTokenURI;
        deployerAddress = msg.sender;
        endColorChangeDate = _endColorChangedate;
    }

    function mint() public payable nonReentrant {
        require(_tokenIdTracker.current() < maxSupply, "Total supply reached");
        _tokenIdTracker.increment();
        uint256 tokenId = _tokenIdTracker.current();
        _colors[tokenId] = colorGenerator.random();

        (bool transferStatus, ) = deployerAddress.call{value:unftPrice}("");
        require(transferStatus, "Address: unable to send value, recipient may have reverted");

        uint256 excessAmount = msg.value.sub(unftPrice);
        if (excessAmount > 0) {
            (bool returnExcessStatus, ) = _msgSender().call{value: excessAmount}("");
            require(returnExcessStatus, "Failed to return excess.");
        }
        
        _mint(_msgSender(), tokenId);

        emit TokenMinted(tokenId, _colors[tokenId]);
        emit ColorChanged(tokenId, 0, _colors[tokenId]); 
    }

    function bulkBuy(uint256 amount) public payable nonReentrant {
        require(amount <= bulkBuyLimit, "Cannot bulk buy more than the preset limit");
        require(_tokenIdTracker.current().add(amount) <= maxSupply, "Total supply reached");
        
        (bool transferStatus, ) = deployerAddress.call{value:unftPrice.mul(amount)}("");
        require(transferStatus, "Address: unable to send value, recipient may have reverted");

        uint256 excessAmount = msg.value.sub(unftPrice.mul(amount));
        if (excessAmount > 0) {
            (bool returnExcessStatus, ) = _msgSender().call{value: excessAmount}("");
            require(returnExcessStatus, "Failed to return excess.");
        }

        for (uint256 i = 0; i < amount; i++) {
            _tokenIdTracker.increment();
            
            uint256 tokenId = _tokenIdTracker.current();
            _colors[tokenId] = colorGenerator.random();
            _mint(_msgSender(), tokenId);   
            
            emit TokenMinted(tokenId, _colors[tokenId]);
            emit ColorChanged(tokenId, 0, _colors[tokenId]); 
         
        }
        
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }        

    function colorOf(uint256 tokenId) public view virtual returns (uint256 color) {
        return _colors[tokenId];
    }

    function changeColor(uint256 tokenId, uint256 color) public {
        require(block.timestamp < endColorChangeDate);
        require(ownerOf(tokenId) == _msgSender());
        require((color >= 0) && (color <= 7));
        
        uint256 oldColor = _colors[tokenId];
        _colors[tokenId] = color;

        emit ColorChanged(tokenId, oldColor, _colors[tokenId]); 
    }
}
