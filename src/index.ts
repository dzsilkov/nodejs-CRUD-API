import dotenv from 'dotenv';
import {createServer} from 'node:http';

dotenv.config();

console.log('app starts stats');

const port = process.env.PORT;
const server = createServer((req, res) => {
    console.log('Request ', req);
    console.log('Response', res);
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});