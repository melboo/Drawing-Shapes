var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({

	text: {
		type: String,
		default: "noTitle"
	}
});

module.exports = mongoose.model('Todo', todoSchema);