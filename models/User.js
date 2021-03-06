const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    developsFor: {
      type: String,
      required: true
    },
    seniorityLevel: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: String,
        required: true
      }
    ],
    about: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
