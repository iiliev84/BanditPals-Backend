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

export async function getHighestScore({id}){
    const sql = `
        SELECT * FROM score WHERE user_id = $1;
    `;
    const {rows: [highScore],} = await db.query(sql, [id]);
    return highScore;
};

export async function postNewScore(){
    const sql = `
        INSERT INTO score (user_id, score, created_at)
        VALUES ($1, $2, $3)
        RETURNING *:
    `;
    const {rows: newScore} = await db.query(sql, [user_id, score, created_at]);
    return newScore[0];
};

export async function updateHighestScore({score, created_at, id}){
    const sql = `
        UPDATE score 
        SET score = $1, created_at = $2
        WHERE user_id = $3
        RETURNING *;
        `;
    const result = await db.query(sql, [score, created_at, id]);
    return result.rows[0];
};