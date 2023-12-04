const handleProfileGet = (req, res, db) => {
  const id = parseInt(req.params.id);

  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not found");
      }
    });
};

export default handleProfileGet;
