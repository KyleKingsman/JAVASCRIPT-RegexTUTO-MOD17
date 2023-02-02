const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true, 
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Enter a valid e-mail address (￣ー￣) "],
    },
    thots: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thot",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
