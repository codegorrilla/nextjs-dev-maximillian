'use server';
import { redirect } from 'next/dist/server/api-utils';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

//this creates a server action , used to make sure that this will only execute in the server

//helper function
function isInValidText(text) {
	return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
	const meal = {
		title: formData.get('title'),
		summary: formData.get('summary'),
		instructions: formData.get('instructions'),
		image: formData.get('image'),
		creator: formData.get('name'),
		creator_email: formData.get('email'),
	};

	//console.log(meal);

	//form validation
	if (
		isInValidText(meal.title) ||
		isInValidText(meal.summary) ||
		isInValidText(meal.instructions) ||
		isInValidText(meal.creator) ||
		isInValidText(meal.creator_email) ||
		!meal.creator_email.includes('@') ||
		!meal.image ||
		meal.image.size === 0
	) {
		return {
			message: 'Invalid input.',
		};
	}

	await saveMeal(meal);
	revalidatePath('/meals');
	redirect('/meals');
}
