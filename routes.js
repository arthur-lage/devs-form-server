const express = require("express");
const routes = express.Router();

const User = require("./models/User");

routes.get("/api/users/get", async (req, res) => {
  try {
    const users = await User.find();

    return res.send(users);
  } catch (e) {
    return res.sendStatus(204);
  }
});

routes.get("/api/users/get-by-id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    return res.send(user);
  } catch (e) {
    return res.sendStatus(204);
  }
});

routes.post("/api/users/register", async (req, res) => {
  try {
    const user = req.body;

    const sameEmail = await User.find({ email: user.email })
    const sameCPF = await User.find({ cpf: user.cpf })

    if (sameEmail.length == 0) {
      console.log("no equal email");
      if (sameCPF.length == 0) {
        console.log("no equal cpf");
        await User.create(user).then((result, err) => {
          if (err) {
            return res.sendStatus(500);
          }

          return res.sendStatus(201);
        });
      } else {
        return res.send("A user with this CPF already exists!");
      }
    } else {
      return res.send("A user with this email already exists!");
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
        return res.sendStatus(500);
      }

      return res.sendStatus(200);
    });
  } catch (e) {
    return res.sendStatus(409);
  }
});

module.exports = routes;
