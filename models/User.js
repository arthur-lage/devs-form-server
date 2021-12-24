const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    cpf: {
      type: String,
      required: true,
      unique: true
    },
    birthdate: {
      type: Date,
      required: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    distanceToRun: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
