import express from 'express';
import asyncMiddleware from '../middlewares/async_middleware';

export const create = (identityService) => async (req, res) => {
  const {managementKey, ensName} = req.body;
  const transaction = await identityService.create(managementKey, ensName);
  res.status(201)
    .type('json')
    .send(JSON.stringify({transaction}));
};

export const execution = (identityService) => async (req, res) => {
  const {contractAddress, ...message} = req.body;
  const transaction = await identityService.executeSigned(contractAddress, message);
  res.status(201)
    .type('json')
    .send(JSON.stringify({transaction}));
};


export const sendByLink = (identityService) => async (req, res) => {
    const {
	identityPubKey, // = "0xF695e673d7D159CBFc119b53D8928cEca4Efe99e",
	ensName, // = "mikhail.tenz-id.xyz",
	sigTransit,// = "0x1111111111111111111111111111111111111111",
	sigReceiver, // = "0x1111111111111111111111111111111111111111",   
	tokenAddress, // = "0x0566C17c5E65d760243b9c57717031c708f13d26",
	tokenId, // = 1000,
	transitAddress, // = "0x1111111111111111111111111111111111111111",
	senderIdentityContract, // = "0x61639e4d54b819e5c09dc9f57c69b1ce176ef40a",

    } = req.body;
    
    console.log(req.body.ensName);
    
    const transaction = await identityService.sendByLink(
	identityPubKey,
	ensName,
	sigTransit,
	sigReceiver,
	tokenAddress,
	tokenId,
	transitAddress,
	senderIdentityContract
    );
    
  res.status(201)
    .type('json')
    .send(JSON.stringify({transaction}));
};


export default (identityService) => {
  const router = new express.Router();

  router.post('/',
    asyncMiddleware(create(identityService)));

  router.post('/execution',
    asyncMiddleware(execution(identityService)));

    router.post('/send-by-link',
    asyncMiddleware(sendByLink(identityService)));

     router.get('/test', (req, res) => {
	 console.log("test");
	 res.status(201)
	     .type('json')
	     .send(JSON.stringify({test: "OK"}));
	 
     });

    
    
  return router;
};
