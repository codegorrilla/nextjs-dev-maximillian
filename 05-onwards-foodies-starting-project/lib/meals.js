import sql from 'better-sqlite3'; // protect from sql injection attack if I use dynamic values inside react statements

const db = sql('meals.db');

export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay for demonstration purposes

	//throw new Error('Loading meals failed');
	return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
