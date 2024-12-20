export default class AppError extends Error {
	statusCode: number;
	status: boolean;
	isOperational = true;
	isZodError = false;

	constructor(message: string, statusCode: number, isZodError = false) {
		super(message);
		this.statusCode = statusCode;
		this.status = statusCode >= 200 && statusCode <= 299;
		this.isOperational = true;
		this.isZodError = isZodError;

		Error.captureStackTrace(this, this.constructor);
	}
}
