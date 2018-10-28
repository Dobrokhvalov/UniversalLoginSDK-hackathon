require('dotenv').config();
import Relayer from '../lib//relayer';

const config = require('../lib/config/relayer');

console.log({config});

const relayer = new Relayer(config);
relayer.start();
