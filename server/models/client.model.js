const mongoose = require('mongoose')

const Client = new mongoose.Schema(
	{
		user: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		pwd: { type: String, required: true },
        matchPwd: { type: String, required: true },
		accountType: { type: String , required: true },
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('ClientrData', Client)

module.exports = model;
