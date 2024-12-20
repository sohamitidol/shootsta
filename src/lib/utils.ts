import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getImageUrl = (fileKey: string) => {
	return `${import.meta.env.VITE_API_URL}/api/v1/files/${fileKey}`;
};
