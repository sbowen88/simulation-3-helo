DELETE FROM friendship
WHERE user_id = $1
AND 
friend_id = $2
