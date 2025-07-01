import db from "#db/client";
import { createUser } from "./queries/users.js"

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.🌱");

async function seed() {
    await createUser({username:"user1", password:"password1"})
    await createUser({username:"user2", password:"password2"})
}