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


    await createAchievement({name: "Zero Waste, Zero Time", description: "Collect all trash pieces in under 10 seconds"});
    await createAchievement({name: "Blitz Clean", description:"Collect all trash pieces in under 15 seconds"});
    await createAchievement({name: "Eco Hero", description: "Collect all trash pieces in under 20 seconds"});
    await createAchievement({name: "Perfect Timing", description: "Finish the game in exactly 15 seconds!"})


    await postUserAchievement({user_id: 1, achievement_id: 3, unlocked_at: "2025-10-07T20:02:00.000Z"});
}