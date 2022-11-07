const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	book: {
		items: [
			{
				_id: { type: Schema.Types.ObjectId, required: true },
				addedAt: { type: Date, required: true },
				finishedAt: { type: Date, required: false },
				score: { type: Number, required: false },
				status: { type: String, required: false }
			}
		]
	} 
});

module.exports = mongoose.model('User', userSchema);
