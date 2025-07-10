import db from "#db/client";
import { createUser } from "./queries/users.js";
import { createScore } from "./queries/score.js";
import { createAchievement, postUserAchievement } from "./queries/achievements.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.🌱");

async function seed() {
    const user1 = await createUser({username:"user1", password:"password1"});
    const user2 = await createUser({username:"user2", password:"password2"});
    await createScore({user_id: user1.id, score: 25, created_at: "2025-07-03T20:02:00.000Z"});
    await createScore({user_id: user2.id, score: 30, created_at: "2025-07-04T20:02:00.000Z"});
    await createAchievement({name: "First Trash", description: "Collect your first piece of trash"});
    await createAchievement({name: "Clean Freak", description:"Collect 5 pieces of trash in one game!"});
    await createAchievement({name: "Eco Hero", description: "Collect all pieces of trash in one round of BanditPals!"});
    await postUserAchievement({user_id: 1, achievement_id: 1, unlocked_at: "2025-10-07T20:02:00.000Z"});
}