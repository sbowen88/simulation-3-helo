
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
SELECT * FROM friendship
RIGHT JOIN helo_users
ON friendship.friend_id = helo_users.id
WHERE id != $1

--fake emails
--bogusemail@fakeemail.com

--redoing sql files
--get frienship list that have my id (in backend)
--get all of users ()
--once I have both arrays, loop through users array, for every user, loop through friends list to see if user is one of my friends 
--if that is true, add a new property to user object like 'is friend: true'
--all will be done on backend
--this endpoint should return all of the users with an indication whether or not they are friend