
CREATE TABLE IF NOT EXISTS friends(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    profile_picture TEXT,
    gender VARCHAR(20),
    hair_color VARCHAR(20),
    eye_color VARCHAR(20),
    hobby VARCHAR(20),
    birthday VARCHAR(20),
    birthday_month VARCHAR(20),
    birth_year VARCHAR(20)
    
);