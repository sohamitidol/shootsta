import { existsSync, rm } from 'fs';
import { resolve } from 'path';
import AppError from '../utils/appError';

export async function getFilePath(fileKey: string) {
	return resolve('uploads/', fileKey);
}

export async function deleteFile(fileKey: string) {
	const filePath = resolve('uploads/', fileKey);
	if (fileKey === 'default.jpg' || !existsSync(filePath))
		throw new AppError('File not found', 404);

	rm(filePath, { force: true }, (err) => {
		console.log(err);
	});
	return {
		status: true,
		message: 'File deleted successfully',
	};
}
