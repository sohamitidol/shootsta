import { Request, Response } from 'express';
import { z } from 'zod';
import * as fileService from '../services/file';

export async function getFile(req: Request, res: Response) {
	const fileKey = z.string().parse(req.params.id);

	const filePath = await fileService.getFilePath(fileKey);
	res.sendFile(filePath);
}

export async function deleteFile(req: Request, res: Response) {
	const fileKey = z.string().parse(req.params.id);

	const response = await fileService.deleteFile(fileKey);
	res.status(200).json(response);
}
