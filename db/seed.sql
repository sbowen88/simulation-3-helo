
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

-- MANUALLY INSERT USER INTO HELO_USERS TABLE
INSERT INTO helo_users(
    auth_id,
    first_name,
    last_name,
    profile_picture,
    gender,
    hair_color,
    eye_color,
    hobby,
    birthday,
    birthday_month,
    birth_year
    )
VALUES (
 'JB_auth_id', 'Jeff', 'Bridges','https://robohash.org/me', 'Male', 'Grey', 'Blue', 'Camping', 25, 'February', 1955
)
--Friendship table 
CREATE TABLE IF NOT EXISTS friendship(
table_id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES helo_users(id),
friend_id INTEGER REFERENCES helo_users(id)
);

--search through all
SELECT * FROM friends
RIGHT JOIN users
ON friends.friend_id = users.id
WHERE id != $1