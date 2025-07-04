import db from "#db/client";

export async function createScore({user_id, score, created_at}){
    const sql = `
        INSERT INTO score (user_id, score, created_at)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const {rows: scores} = await db.query(sql, [user_id, score, created_at]);
    return scores;
};