import db from "#db/client";
import { createUser } from "./queries/users.js";
import { createScore } from "./queries/score.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.🌱");

async function seed() {
    const user1 = await createUser({username:"user1", password:"password1"});
    const user2 = await createUser({username:"user2", password:"password2"});
    await createScore({user_id: user1.id, score: 4, create_at: "2025-07-03T20:02:00.000Z"});
    await createScore({user_id: user2.id, score: 10, create_at: "2025-07-04T20:02:00.000Z"});
}