'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _ensRegistrars;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

module.exports = Object.freeze({
  jsonRpcUrl: process.env.JSON_RPC_URL || "https://ropsten.infura.io",
  port: process.env.PORT || 3005,
  privateKey: process.env.PRIVATE_KEY,
  chainSpec: {
    ensAddress: process.env.ENS_ADDRESS || "0x62d6c93df120fca09a08258f3a644b5059aa12f0",
    chainId: 3
  },
    ensRegistrars: {
	"tenz-id.xyz": {
	    resolverAddress: "0x406ff767da8c4862d6854369bdc4f9494e0f5d30",
	    registrarAddress: "0xd4a0d9531bf28c26869c526b2cad2f2eb77d3844",
	    privteKey: process.env.ENS_REGISTRAR1_PRIVATE_KEY
	    
	}
    }


    // (_ensRegistrars = {}, (0, _defineProperty3.default)(_ensRegistrars, process.env.ENS_DOMAIN_1, {
  //   resolverAddress: process.env.ENS_RESOLVER1_ADDRESS,
  //   registrarAddress: process.env.ENS_REGISTRAR1_ADDRESS,
  //   privteKey: process.env.ENS_REGISTRAR1_PRIVATE_KEY
  // }), (0, _defineProperty3.default)(_ensRegistrars, process.env.ENS_DOMAIN_2, {
  //   resolverAddress: process.env.ENS_RESOLVER2_ADDRESS,
  //   registrarAddress: process.env.ENS_REGISTRAR2_ADDRESS,
  //   privteKey: process.env.ENS_REGISTRAR2_PRIVATE_KEY
  // }), (0, _defineProperty3.default)(_ensRegistrars, process.env.ENS_DOMAIN_3, {
  //   resolverAddress: process.env.ENS_RESOLVER3_ADDRESS,
  //   registrarAddress: process.env.ENS_REGISTRAR3_ADDRESS,
  //   privteKey: process.env.ENS_REGISTRAR3_PRIVATE_KEY
    // }), _ensRegistrars)
    
    
});
