import db from "#db/client";


//POST achievements
export async function createAchievement({name, description}){
    const sql = `
        INSERT INTO achievements (name, description) VALUES ($1, $2) RETURNING *;
    `;

    const {rows: newAchievements} = await db.query (sql, [name, description]);
    return newAchievements;
};

//getAllAchievements -> for user to see all avaiable achievements


//getUserAchievements -> for user to see all achievements they have unlocked
