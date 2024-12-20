import { Ambulance } from '@/types/ambulance';
import { QueryOptions } from '@/types/common';
import { Doctor } from '@/types/doctor';
import axios from 'axios';
import FormData from 'form-data';

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL + '/api/v1',
});

type PaginationData<T> = {
	status: boolean;
	message: string;
	page: number;
	total: number;
	data: T[];
};

export async function getDoctors(options: QueryOptions) {
	const data = (
		await instance.get('doctors', {
			params: options,
		})
	).data as PaginationData<Doctor>;

	return data;
}

export async function getDoctorById(id?: number) {
	const data = (await instance.get(`doctors/${id}`)).data.data as Doctor;

	return data;
}

export async function addDoctorDetails(doctor: any) {
	const data = (await instance.post('doctors', doctor)).data.data[0] as Doctor;

	return data;
}

export async function updateDoctorDetails(doctor: any) {
	const data = (await instance.patch(`doctors/${doctor.id}`, doctor)).data
		.data[0] as Doctor;

	return data;
}

export async function removeDoctor(id: number) {
	const data = (await instance.delete(`doctors/${id}`)).data.data[0] as Doctor;

	return data;
}

export async function getAmbulances(options: QueryOptions) {
	const data = (
		await instance.get('ambulances', {
			params: options,
		})
	).data as PaginationData<Ambulance>;

	return data;
}

export async function getAmbulanceById(id: number) {
	const data = (await instance.get(`ambulances/${id}`)).data.data as Ambulance;

	return data;
}

export async function addAmbulanceDetails(ambulance: any) {
	const data = (await instance.post('ambulances', ambulance)).data
		.data[0] as Ambulance;

	return data;
}

export async function updateAmbulanceDetails(id: number, ambulance: any) {
	const data = (await instance.patch(`ambulances/${id}`, ambulance)).data
		.data[0] as Ambulance;

	return data;
}

export async function removeAmbulance(id: number) {
	const data = (await instance.delete(`ambulances/${id}`)).data
		.data[0] as Ambulance;

	return data;
}

export async function uploadFile(formData: FormData) {
	const data = (
		await instance.post(`files/upload`, formData)
	).data.fileKey as string;

	return data;
}

export async function deleteFile(fileKey: string) {
	const data = (await instance.delete(`files/${fileKey}`)).data;

	return data;
}
