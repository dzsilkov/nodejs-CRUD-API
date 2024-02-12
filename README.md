# nodejs CRUD - API

Instructions:
1. Clone [repository](https://github.com/dzsilkov/nodejs-CRUD-API.git).
2. Checkout `nodejs-crud-api` branch; 
3. Run `npm install` in repository folder to install dependencies.
4. Add file `.env` with content `PORT=4000` (or other port number);
5. You can use scripts to run in dev mode or build product bundle. Commands for NPM:
- `npm run start:dev` starts server in dev mode with nodemone;
- `npm run start:prod` makes production bundle and starts server;
5. After server have been starting, you will get access to it with url `localhost:4000` bt default or other port from .env file. To test api you can use [Postman](https://www.postman.com/) or other utility;
6. You can use endpoints:
- `/api/users` `GET` all users,
- `/api/users` `POST` new user;
- `/api/users/:id` `GET` user by id.
- `/api/users/:id` `PUT` change user by id,
- `/api/users/:id` `DELETE` user using id;
