import dotenv from 'dotenv';

import {listenServer} from './server/server';

dotenv.config();

console.log('app index stars');

const port = process.env.PORT || 4000;

listenServer(port);