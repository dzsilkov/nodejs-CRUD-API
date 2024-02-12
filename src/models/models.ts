export type User = {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export type UserDto = Omit<User, 'id'>;

export type UserRoute = {
    path: string;
    method: string;
    handler: () => Promise<void>;
    params:  string[];
}

