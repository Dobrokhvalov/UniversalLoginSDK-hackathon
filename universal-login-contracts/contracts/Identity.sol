pragma solidity ^0.4.24;
import "./SignedApprovalScheme.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


contract IdentityFactory {
  function createIdentity(bytes32 _key, bytes32 _hashLabel, string _name, bytes32 _node, string ens, string registrar, string resolver)
    public returns(address) {
    Identity identity = new Identity(_key, _hashLabel, _name, _node, ens, registrar, resolver);
    return identity;
  }
}

contract Identity is SignedApprovalScheme {
  address private _identityFactoryAddr;

  constructor(
	      bytes32 _key, bytes32 _hashLabel, string _name, bytes32 _node, string ens, string registrar, string resolver)
            payable public
    SignedApprovalScheme(_key)
    //ENSRegistered(_hashLabel, _name, _node, ens, registrar, resolver)
    //SignedApprovalScheme(_key) {
    {   //
    }


  function transferByLink(
			  bytes sigTransfer,
			  bytes sigReceiver,
			  address tokenAddress,
			  uint256 tokenId,
			  bytes32 receiverPubKey,
			  bytes transitPubKey,
			  bytes32 _hashLabel,
			  string _name,
			  bytes32 _node,
			  string ens,
			  string registrar,
			  string resolver
			  ) public {

    address receiverIdentity;
    if (isContract(address(receiverPubKey)))  {
      receiverIdentity = address(receiverPubKey);
    } else {
      // 0x477be1f1b5cd97125789ac0ed05c501b9c325283 - old address
      IdentityFactory _identityFactory = IdentityFactory(0xd77948e6d69f5691d22d039306437386aa25e9e9);
      receiverIdentity = _identityFactory.createIdentity(receiverPubKey, _hashLabel, _name, _node, ens, registrar, resolver);
    }

    /* StandardToken token = StandardToken(tokenAddress); */
    /* token.transfer(receiverIdentity, tokenAmount); */

    ERC721 nft = ERC721(tokenAddress);
    nft.transferFrom(address(this), receiverIdentity, tokenId);
    
  }

  function isContract(address addr) private returns (bool) {
    uint size;
    assembly { size := extcodesize(addr) }
    return size > 0;
  }
}

