// import fs from 'node:fs';

import sql from 'better-sqlite3'; // protect from sql injection attack if I use dynamic values inside react statements
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
	region: 'eu-north-1',
});
const db = sql('meals.db');

export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay for demonstration purposes

	//throw new Error('Loading meals failed');
	return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
	return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
	meal.slug = slugify(meal.title, { lower: true });
	meal.instructions = xss(meal.instructions);

	const extension = meal.image.name.split('.').pop();
	const fileName = `${meal.slug}.${extension}`;

	//const stream = fs.createWriteStream(`public/images/${fileName}`);

	const bufferedImage = await meal.image.arrayBuffer();

	// stream.write(Buffer.from(bufferedImage), (error) => {
	// 	if (error) {
	// 		throw new Error('saving image failed');
	// 	}
	// });

	//need to store the image path url to the DB
	//meal.image = `/images/${fileName}`;

	s3.putObject({
		Bucket: 'sanjibadhya-demo-next-foodie-app-images',
		Key: fileName,
		Body: Buffer.from(bufferedImage),
		ContentType: meal.image.type,
	});

	meal.image = fileName;

	db.prepare(
		`
		INSERT INTO meals
		(title, summary, instructions, creator, creator_email, image, slug)
		VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
		 @slug
		)
	`
	).run(meal);
}
