import db from "../../../db";
import { asc, count } from 'drizzle-orm';
import { advocates } from "../../../db/schema";
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	const limit = searchParams.get('limit');
	const offset = searchParams.get('offset');

	const data = await db.select().from(advocates)
		.orderBy(asc(advocates.id))
		.limit(Number(limit)) // the number of rows to return
		.offset(Number(offset)); // the number of rows to skip

	const resultCount = await db.select({ count: count() }).from(advocates);
	
	return Response.json({ data, count: resultCount[0].count });
}
