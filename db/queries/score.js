import db from "#db/client";

export async function createScore({user_id, score}){
    const sql = `
        INSERT INTO score (user_id, score)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const {rows: scores} = await db.query(sql, [user_id, score]);
    return scores;
};

export async function getHighestScore(id){
  const sql = `
  SELECT * FROM score WHERE id = $1
  `;
  const {rows: highScore} = await db.query(sql, [id]);
  return highScore[0];
  };

export async function updateHighestScore({score, created_at, id}){
    const sql = `
        UPDATE score 
        SET score = $1, created_at = $2
        WHERE user_id = $3
        RETURNING *
        `;
    const {rows: highest} = await db.query(sql, [score, created_at, id]);
    return highest[0];
};

export async function getScores(){
    const sql = `
    SELECT score.*, 
    users.username
    FROM score
    JOIN users
    ON score.user_id = users.id 
    `;
    const {rows: score} = await db.query(sql);
    return score;
};









