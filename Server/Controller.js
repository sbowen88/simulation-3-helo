module.exports = {
  getUserInfo: (req, res) => {
    let db = req.app.get("db");
    console.log(`fetching user ${req.session.passport.user} information`);
    let user_id = req.session.passport.user;
    db
      .getUserInfo([user_id])
      .then(resp => {
        console.log(resp[0]);
        res.status(200).send(resp[0]);
      })
      .catch(() => res.status(500).send());
  },
  userPatch: (req, res) => {
    let db = req.app.get("db");
    let user_id = req.session.passport.user;
    console.log(req.body, user_id);
    let {
      first_name,
      last_name,
      gender,
      hair_color,
      eye_color,
      hobby,
      birthday,
      birthday_month,
      birth_year
    } = req.body;

    db
      .userPatch([
        first_name,
        last_name,
        gender,
        hair_color,
        eye_color,
        hobby,
        birthday,
        birthday_month,
        birth_year,
        user_id
      ])
      .then(resp => {
        res.status(200).send(resp[0]);
        console.log("Profile Updated");
      })
      .catch(() => res.status(500).send());
    console.log("not updated");
  },
  getUsers: (req, res) => {
    let db = req.app.get("db");
    let id = req.session.passport.user;
    console.log("getting all users");
    db
      .getUsers(id)
      .then(users => {
        res.status(200).send(users);
      })
      .catch(err => {
        console.log("couldnt find users", err);
        res.status(500).send();
      });
  },
  getRecommended: (req, res) => {
    let db = req.app.get("db");
    let { sort_parameter, user_parameter } = req.body;
    console.log("getting recommended friends");
    db
      .getRecommended(sort_parameter, user_parameter)
      .then(users => {
        console.log("filtered users", users);
        res.status(200).send(users);
      })
      .catch(err => {
        console.log("couldnt find users", err);
        res.status(500).send();
      });
  },
  addFriend: (req, res) => {
    let db = req.app.get("db");
    let {user_id, friend_id}=req.body;
    console.log("adding friend");
    db
      .addFriend(user_id, friend_id)
      .then(users => {
        res.status(200).send(users);
        console.log('friend added')
      })
      .catch(err => {
        console.log("couldnt add friend", err);
        res.status(500).send();
      });
  },
  removeFriend: (req, res) => {
    let db = req.app.get("db");
    let {user_id, friend_id}=req.params;
    console.log("getting all users");
    db
      .addFriend(user_id, friend_id)
      .then(users => {
        res.status(200).send();
        console.log('friend removed')
      })
      .catch(err => {
        console.log("couldnt remove friend", err);
        res.status(500).send();
      });
  },
  userSearch: (req, res) => {
    let db = req.app.get("db");
    db
      .userSearch(req.params.search_parameter, req.params.search_input)
      .then(users => {
        console.log("filtered users", users);
        res.status(200).send(users);
      })
      .catch(err => {
        console.log("couldnt find users", err);
        res.status(500).send();
      });
  }
};
