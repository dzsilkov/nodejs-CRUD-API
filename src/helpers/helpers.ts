import {UserDto} from '../models/models';
import {IncomingMessage} from 'http';
import {validate as uuidValidate, version as uuidVersion} from 'uuid';


const requiredFieldsPresent = (userData: UserDto): boolean =>
    'username' in userData && 'age' in userData && 'hobbies' in userData;

export const isValidUserRequiredData = (data: string): boolean => {
    const user: UserDto = JSON.parse(data);
    return !!user && requiredFieldsPresent(user);
};

export const getParamId = (req: IncomingMessage) => (req.url as string).split('/')[3];

export const uuidIsValid = (uuid: string): boolean => {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};