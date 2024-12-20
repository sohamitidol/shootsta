import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const timestamps = {
	createdAt: text('created_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	deletedAt: text('deletedAt'),
};

export const doctors = sqliteTable('doctors', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name', { length: 255 }).notNull(),
	age: integer('age', { mode: 'number' }).notNull(),
	specialty: text('specialty', { length: 512 }),
	contact: text('contact', { length: 20 }),
	description: text('description', { length: 512 }),
	location: text('location', { length: 255 }),
	imageFileKey: text('image_file_key', { mode: 'text' }).default('default.jpg'),
	isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
	...timestamps,
});

export const ambulances = sqliteTable('ambulances', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	title: text('name', { length: 255 }).notNull(),
	contact: text('contact', { length: 20 }),
	description: text('description', { length: 512 }),
	location: text('location', { length: 255 }),
	imageFileKey: text('image_file_key', { mode: 'text' }).default('default.jpg'),
	isDeleted: integer('is_deleted', { mode: 'boolean' }).default(false),
	...timestamps,
});
