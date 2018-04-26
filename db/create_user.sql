insert into helo_users 
(display_name, auth_id, profile_pic)
values ($1, $2, $3)
returning *;
