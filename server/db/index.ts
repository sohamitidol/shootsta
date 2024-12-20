import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema/schema';

const sqlite = new Database('shootsta.db');
export const db = drizzle({ client: sqlite, schema: schema, logger: true });
export type DB = typeof db;

db.run('SELECT 1=1');
console.log('Database successfully connected...');
