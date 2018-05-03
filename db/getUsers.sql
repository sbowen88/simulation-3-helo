SELECT * FROM friendship
RIGHT JOIN helo_users
ON friendship.friend_id = helo_users.id
WHERE id != $1


-- once you have join, loop through and check every user object to see if the userid from friendship table is equal to currently logged in user 
-- if it is, leave it alone, if not, delete the userid prooperty from the object