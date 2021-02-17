const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, unique: true },
	token: { type: String },
	expire_date: { type: Date }
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
