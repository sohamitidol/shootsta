import { faker } from '@faker-js/faker';
import { AddDoctor } from '../../validators/doctor';
import { db } from '../index';
import { doctors } from '../schema/schema';

function getDummyData(numberOfRecords: number) {
	const dataArray: AddDoctor[] = [];
	for (let i = 1; i <= numberOfRecords; i++) {
		const data = {
			name: faker.person.fullName(),
			age: faker.number.int({ min: 16, max: 100 }),
			specialty: faker.person.jobTitle(),
			contact: faker.internet.email(),
			description: faker.person.jobDescriptor(),
			location: faker.location.city()
		};
		dataArray.push(data);
	}

	return dataArray;
}

export async function seed(numberOfRecords: number) {
	const seedData = getDummyData(numberOfRecords);
	await db.insert(doctors).values(seedData);

	console.log('Doctors data seeded successfully.');
}
