const mongoose = require("mongoose");
const Users = require("./UsersUtils");

const config = require("./../../config");

mongoose.Promise = global.Promise;

module.exports.setUpConnection = () => {
	let DB_URL = config.MONGO_URL;
	try {
		mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports.Users = Users;
