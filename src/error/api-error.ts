export class ApiError extends Error {
    constructor(status: number, message: string) {
        super();
    }

    static internal(message) {
        return new ApiError(500, message);
    }
}