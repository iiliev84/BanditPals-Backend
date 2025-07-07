DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS score;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS user_achievements;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE score(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE achievements(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL;
    dscription TEXT
);

CREATE TABLE user_achievements(
    user_id INTEGER NOT NULL,
    achievement_id INTEGER NOT NULL,
    unlocked_at TIMESTAMP DEFAULT NOW(),
    (user_id, achievement_id) PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
);