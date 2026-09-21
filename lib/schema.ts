import { pgTable, uuid, text, timestamp, date, numeric, } from 'drizzle-orm/pg-core'

export const commissions = pgTable('commissions', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: uuid('user_id').notNull(),
	title: text('title').notNull(),
	date: date('date').notNull(),
	price: numeric('price', { precision: 10, scale: 2, }).notNull(),
	commissionRate: numeric('commission_rate', { precision: 5, scale: 2, }).notNull(),
	notes: text('notes'),
	imageKey: text('image_key'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
})