import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './server/db/schema/schema.ts',
	out: './server/db/migrations',
	dbCredentials: {
		url: 'file:shootsta.db',
	},
	verbose: true,
	strict: true,
});
