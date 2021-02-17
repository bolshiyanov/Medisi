const mongoose = require("mongoose");
const Users = require("../models/Users");

const User = mongoose.model("Users");

const ObjectID = mongoose.Types.ObjectId;

module.exports.create = data => {
	const new_obj = new User(data);
	const promise = new_obj.save();
	return promise;
};

module.exports.get_all = () => {
	return Users.find({});
};

module.exports.get_by_id = (_id) => {
	return Users.findOne({ _id: ObjectID(_id) });
};

module.exports.get_by_token = (token) => {
	return Users.findOne({ token: token });
};

module.exports.get_by_email = (email) => {
	return Users.findOne({ email: email });
};


module.exports.update = (object) => {
	return Users.findOneAndUpdate({ _id: ObjectID(object._id) }, { $set: object.setter });
};
