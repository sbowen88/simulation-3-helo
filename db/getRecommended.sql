SELECT * FROM users
WHERE 
friend_status = false
AND
$1 = $2
