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

routes.get("/api/users/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if(user.length === 0) {
      return res.sendStatus(204)
    } else {
      return res.send(user);
    }
  } catch (e) {
    return res.sendStatus(204);
  }
});

routes.post("/api/users/register", async (req, res) => {
  try {
    const user = req.body;

    const sameEmail = await User.find({ email: user.email })

    if (sameEmail.length == 0) {
        await User.create(user).then((result, err) => {
          if (err) {
            return res.sendStatus(500);
          }

          return res.sendStatus(201);
        });
    } else {
      return res.send("A user with this email already exists!");
    }
  } catch (e) {
    return res.send(e);
  }
});

routes.delete("/api/users/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await User.findByIdAndDelete(id).then((result, err) => {
      if (err) {
        return res.sendStatus(500);
      }

      return res.sendStatus(204);
    });
  } catch (e) {
    return res.sendStatus(409);
  }
});

routes.delete("/api/users/delete-all", async (req, res) => {
  try {
    await User.deleteMany()

    res.sendStatus(204)
  } catch (e) {
    return res.sendStatus(409);
  }
});


module.exports = routes;
