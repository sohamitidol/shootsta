import { NextFunction, Request, Response } from 'express';
import AppError from './appError';

export default function globalErrorHandler(
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
): void {
	console.error(err);
	if (err.name === 'ZodError') {
		err = new AppError(JSON.stringify(err.issues), 400, true);
	}
	if (err.name === 'MulterError') {
		err = new AppError(err, 400);
	}
	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
		return;
	}

	sendErrorProd(err, res);
}

const sendErrorDev = (err: any, res: Response) => {
	const statusCode = err.statusCode || 500;
	const status = err.status || false;
	const message = err.isZodError
		? JSON.parse(err.message)
		: err.message || 'something went wrong';

	return res.status(statusCode).json({
		status: status,
		message: message,
	});
};

const sendErrorProd = (err: any, res: Response) => {
	const statusCode = err.statusCode || 500;
	const status = err.status || false;
	const message = err.isZodError
		? JSON.parse(err.message)
		: err.message || 'something went wrong';

	if (err.isOperational) {
		return res.status(statusCode).json({
			status: status,
			message: message,
		});
	}

	return res.status(statusCode).json({
		status: status,
		message: 'something went wrong',
	});
};
