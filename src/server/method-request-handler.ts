import {IncomingMessage, ServerResponse} from 'http';
import {UserDto} from '../models/models';
import {db} from '../db/db-service';
import {parseDataRequest} from './parse-data-request';
import {getParamId, isValidUserRequiredData, uuidIsValid} from '../helpers/helpers';
import {
    invalidUserRequiredDataResponse,
    invalidUserResponse,
    invalidUuidResponse,
    successUserCreateResponse,
    successUserDeletedResponse,
    successUserResponse,
    successUsersResponse,
    successUserUpdateResponse
} from './response-handlers';


export class MethodRequestHandler {

    static async getRequestHandler(req: IncomingMessage, res: ServerResponse) {
        const userId = getParamId(req);
        if (userId) {
            if (!uuidIsValid(userId)) {
                await invalidUuidResponse(res);
                return;
            }
            const user = await db.getUser(userId);
            if (!user) {
                await invalidUserResponse(res);
                return;
            }
            await successUserResponse(res, user);
            return;
        }
        const data = await db.getAllUsers();
        await successUsersResponse(res, data);
    }

    static async postRequestHandler(req: IncomingMessage, res: ServerResponse) {
        try {
            const data = await parseDataRequest(req);

            if (!isValidUserRequiredData(data)) {
                await invalidUserRequiredDataResponse(res);
                return;
            }
            const newUser: UserDto = JSON.parse(data);
            const user = await db.createUser(newUser);

            if (!user) {
                await invalidUserResponse(res);
                return;
            }

            await successUserCreateResponse(res, user);
        } catch (e) {
        }
    }


    static async putRequestHandler(req: IncomingMessage, res: ServerResponse) {
        const userId = getParamId(req);
        if (userId) {
            if (!uuidIsValid(userId)) {
                await invalidUuidResponse(res);
                return;
            }
            const data = await parseDataRequest(req);
            let updateUserFields: Partial<UserDto> = JSON.parse(data);

            const updatedUser = await db.updateUser(userId, updateUserFields);
            if (!updatedUser) {
                await invalidUserResponse(res);
                return;
            }
            await successUserUpdateResponse(res, updatedUser);
        }

    }

    static async deleteRequestHandler(req: IncomingMessage, res: ServerResponse) {
        const userId = getParamId(req);

        if (userId) {
            if (!uuidIsValid(userId)) {
                await invalidUuidResponse(res);
                return;
            }
            const user = await db.getUser(userId);
            if (!user) {
                await invalidUserResponse(res);
                return;
            }
            await db.deleteUser(userId);
            await successUserDeletedResponse(res);
        }
    }

}