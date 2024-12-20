import { faker } from '@faker-js/faker';
import { AddAmbulance } from '../../validators/ambulance';
import { db } from '../index';
import { ambulances } from '../schema/schema';

function getDummyData(numberOfRecords: number) {
	const dataArray: AddAmbulance[] = [];
	for (let i = 1; i <= numberOfRecords; i++) {
		const data = {
			title: faker.vehicle.model(),
			contact: faker.internet.email(),
			description: faker.string.sample({ min: 20, max: 80 }),
			location: faker.location.city(),
		};
		dataArray.push(data);
	}

	return dataArray;
}

export async function seed(numberOfRecords: number) {
	const seedData = getDummyData(numberOfRecords);
	await db.insert(ambulances).values(seedData);

	console.log('Ambulances data seeded successfully.');
}
