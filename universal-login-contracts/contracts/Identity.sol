pragma solidity ^0.4.24;
import "./SignedApprovalScheme.sol";
import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


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
			  uint tokenAmount,
			  bytes32 receiverPubKey,
			  bytes transitPubKey,
			  bytes32 _hashLabel,
			  string _name,
			  bytes32 _node,
			  string ens,
			  string registrar,
			                              string resolver
			  ) public returns (bool) {




    address receiverIdentity;
    if (isContract(address(receiverPubKey)))  {
      receiverIdentity = address(receiverPubKey);
    } else {
      IdentityFactory _identityFactory = IdentityFactory(0x477be1f1b5cd97125789ac0ed05c501b9c325283);
      receiverIdentity = _identityFactory.createIdentity(receiverPubKey, _hashLabel, _name, _node, ens, registrar, resolver);
    }

    StandardToken token = StandardToken(tokenAddress);
    token.transfer(receiverIdentity, tokenAmount);
  }

  function isContract(address addr) private returns (bool) {
    uint size;
    assembly { size := extcodesize(addr) }
    return size > 0;
  }
}

