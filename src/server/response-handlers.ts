import {ServerResponse} from 'http';
import {User} from '../models/models';

export const invalidInternalErrorResponse = async (res: ServerResponse) => {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal server Error');
};

export const invalidUuidResponse = async (res: ServerResponse) => {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('Id isn\'t uuid');
};

export const invalidUserResponse = async (res: ServerResponse) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('User doesn\'t exist');
};

export const invalidUserRequiredDataResponse = async (res: ServerResponse) => {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end('Invalid Required user data');
};

export const successUserResponse = async (res: ServerResponse, user: User) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(user));
};

export const successUserUpdateResponse = async (res: ServerResponse, user: User) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(user));
};

export const successUsersResponse = async (res: ServerResponse, users: User[]) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users));
};

export const successUserDeletedResponse = async (res: ServerResponse) => {
    res.writeHead(204, {'Content-Type': 'application/json'});
    res.end('Success');
};

export const successUserCreateResponse = async (res: ServerResponse, user: User) => {
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(user));
};

export const invalidUnknownMethod = async (res: ServerResponse) => {
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('unknown method');
};