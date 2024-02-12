import userController from '../controllers/user-controller';
import {UserRoute} from '../models/models';

export const userRoutes: UserRoute[] = [
    {
        path: '/api/users',
        method: 'GET',
        handler: userController.getAll,
        params: [],
    },
    {
        path: '/api/users/',
        method: 'GET',
        handler: userController.getOne,
        params: ['id'],
    },
    {
        path: '/api/users',
        method: 'POST',
        handler: userController.create,
        params: [],
    },
    {
        path: '/api/users/',
        method: 'PUT',
        handler: userController.update,
        params: ['id'],
    },
    {
        path: '/api/users/',
        method: 'DELETE',
        handler: userController.delete,
        params: ['id'],
    },
];