import {User, UserDto} from '../models/models';
import {v4 as uuidv4} from 'uuid';

class DbService {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }

    async getUser(id: string): Promise<User | undefined> {
        return this.users.find((user) => user.id === id);
    }

    async createUser(user: UserDto): Promise<User> {
        const id = uuidv4();
        user = {id, ...user} as User;
        this.users.push(user as User);
        return user as User;
    }

    async updateUser(userId: string, newData: Partial<UserDto>) {
        const user = this.users.find((user) => user.id === userId);

        if (!user) {
            return;
        }

        user.username = newData.username ?? user.username;
        user.age = newData.age ?? user.age;
        user.hobbies = newData.hobbies ?? user.hobbies;

        return user;
    }

    async deleteUser(userId: string): Promise<boolean> {
        this.users = this.users.filter((user) => user.id !== userId);
        return true;
    }

}

const db = new DbService();

export {db};