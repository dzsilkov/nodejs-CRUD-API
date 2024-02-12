export class ApiError extends Error {
    // private status;
    constructor(status: number, message: string) {
        super();
        this.message = message;
        console.log(status);
    //     this.status = status;
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static badRequest(message) {
        return new ApiError(404, message);
    }
}