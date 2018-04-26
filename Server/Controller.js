module.exports = {
userPatch: (req, res) => {
  let db = req.app.get("db");
  console.log(req.session.user.id);
  let user_id = req.session.user.id;
  let {
    first_name,
    last_name,
    gender,
    hair_color,
    eye_color,
    hobby,
    birthday,
    birth_year
  } = req.body;
  let {id}=req.session;
  console.log(id)
  db
    .userPatch(
        first_name,
        last_name,
        gender,
        hair_color,
        eye_color,
        hobby,
        birthday,
        birth_year,
        user_id
    )
    .then(resp => {
      res.status(200).send(resp);
    })
    .catch(() => res.status(500).send());
  console.log("Property Added");
}
}
