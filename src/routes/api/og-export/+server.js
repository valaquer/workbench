import { writeFile } from 'fs/promises';
import { resolve } from 'path';

export async function POST({ request }) {
	const formData = await request.formData();
	const file = formData.get('file');
	const buffer = Buffer.from(await file.arrayBuffer());
	const dest = resolve('static/og-image-provoque.jpg');
	await writeFile(dest, buffer);
	return new Response(JSON.stringify({ path: dest }), { status: 200 });
}
