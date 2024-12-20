export const catchAsync = (fn: any) => {
	const errorHandler = (req: any, res: any, next: any) => {
		fn(req, res, next).catch(next);
	};

	return errorHandler;
};
