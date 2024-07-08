import type { PageServerLoad } from './$types';
import { contentService } from '$lib/server/db/services/content';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const result = await contentService.get_content_items();

	if (!result.success) {
		fail(400, { message: 'Error getting content' });
	}

	return { content: result?.data?.items };
};

export const actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		try {
			await contentService.delete_content(id);
			return { success: true };
		} catch (err) {
			return fail(500, { message: 'Failed to delete content' });
		}
	}
};
