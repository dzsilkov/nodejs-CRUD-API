import dotenv from 'dotenv';
import {listenServer} from './server/server';

dotenv.config();
const port = process.env.PORT || 4000;

listenServer(port);