import { type NextRequest } from 'next/server'
import { AdvocateService } from "./service/AdvocateService";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const limit = searchParams.get('limit');
	const offset = searchParams.get('offset');

	try {
		const advocateService = new AdvocateService();
		const { data, count } = await advocateService.find(Number(limit), Number(offset));

		return Response.json({ data, count });

	} catch (error) {
		throw new Error(String(error));
	}
}
