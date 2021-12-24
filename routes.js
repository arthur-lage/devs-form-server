const express = require("express");
const routes = express.Router();

const User = require("./models/User");

routes.get("/api/users/get", async (req, res) => {
  try {
    const users = await User.find();

    res.sendStatus(200).send(users);
  } catch (e) {
    res.sendStatus(204);
  }
});

routes.get("/api/users/get-by-id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    res.sendStatus(200).send(user);
  } catch (e) {
    res.sendStatus(204);
  }
});

routes.post("/api/users/register", async (req, res) => {
  try {
    const user = req.body;

    if ((await User.find({ email: user.email })) == []) {
      if ((await User.find({ cpf: user.cpf })) == []) {
        await User.create(user).then((result, err) => {
          if (err) {
            return console.log(err)
          }

          return res.sendStatus(201);
        });
      } else {
          res.sendStatus(409).send("A user with this CPF already exists!")
        }
    } else {
        res.sendStatus(409).send("A user with this email already exists!")

    }
  } catch (e) {
    return res.sendStatus(204);
  }
});

routes.delete("/api/users/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await User.findByIdAndDelete(id).then((result, err) => {
      if (err) {
        return console.log(err)
      }

      return res.sendStatus(200);
    });
  } catch (e) {
    res.sendStatus(409);
  }
});

module.exports = routes;
