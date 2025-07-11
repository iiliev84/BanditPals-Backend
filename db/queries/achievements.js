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
export async function getAllAchievements(){
    const sql = `
        SELECT * FROM achievements;`;
    const {rows: allAchievements} = await db.query(sql);
    return allAchievements;
};


//getUserAchievements -> for user to see all achievements they have unlocked
export async function getUserAchievements(user_id){
    const sql = `
        SELECT * FROM user_achievements WHERE user_id = $1;
    `;
    const {rows: userAchievements} = await db.query(sql, [user_id]);
    return userAchievements;
};



//POST user achievements
export async function postUserAchievement ({user_id, achievement_id}){
    const sql = `
        INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2) RETURNING *;
    `;
    const {rows: userAchievements} = await db.query(sql,[user_id, achievement_id]);
    return userAchievements;
};