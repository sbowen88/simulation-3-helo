SELECT * FROM friends
WHERE 
friend_status = false
AND
$1 = $2
