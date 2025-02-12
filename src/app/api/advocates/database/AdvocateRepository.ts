import db from "../../../../db";
import { asc, count } from 'drizzle-orm';
import { advocates } from "../../../../db/schema";

export class AdvocateRepository {
  async find(limit: number, offset: number) {
    const data = await db.select().from(advocates)
      .orderBy(asc(advocates.id))
      .limit(limit) // the number of rows to return
      .offset(offset); // the number of rows to skip

    const resultCount = await db.select({ count: count() }).from(advocates);
    return { data, count: resultCount[0].count };
  }
}