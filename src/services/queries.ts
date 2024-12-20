import { QueryOptions } from '@/types/common';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
	getAmbulanceById,
	getAmbulances,
	getDoctorById,
	getDoctors,
} from './api';

export function useDoctors(queryOptions: QueryOptions) {
	return useQuery({
		queryKey: ['doctors', queryOptions],
		queryFn: () => getDoctors(queryOptions),
		placeholderData: keepPreviousData,
	});
}

export function useDoctorById(id?: number) {
	return useQuery({
		queryKey: ['doctors', { id }],
		queryFn: () => getDoctorById(id),
	});
}

export function useAmbulances(queryOptions: QueryOptions) {
	return useQuery({
		queryKey: ['ambulances', queryOptions],
		queryFn: () => getAmbulances(queryOptions),
		placeholderData: keepPreviousData,
	});
}

export function useAmbulanceById(id: number) {
	return useQuery({
		queryKey: ['ambulances', { id }],
		queryFn: () => getAmbulanceById(id),
	});
}
