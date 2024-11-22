export const db = await drizzle("node-postgres", process.env.DATABASE_URL!);
