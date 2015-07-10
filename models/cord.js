var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cordSchema = new Schema({

	text: {
		type: String,
		default: "noTitle"
	},
	g1X: {
			type: Number,
			default: 100,
			required: true
	},
	g1Y: {
			type: Number,
			default: 100,
			required: true
	},
	g1jX: {
			type: Number,
			default: 100,
			required: true
	},
	g1jY: {
			type: Number,
			default: 100,
			required: true
	},
	g1dirc: {
			type: Number,
			default: 100,
			required: true
	},
	g1Jradius: {
			type: Number,
			default: 100,
			required: true
	},
	g1outerR: {
			type: Number,
			default: 100,
			required: true
	},
	g2X: {
			type: Number,
			default: 100,
			required: true
	},
	g2Y: {
			type: Number,
			default: 100,
			required: true
	},
	g2jX: {
			type: Number,
			default: 100,
			required: true
	},
	g2jY: {
			type: Number,
			default: 100,
			required: true
	},
	g2dirc: {
			type: Number,
			default: 100,
			required: true
	},
	g2Jradius: {
			type: Number,
			default: 100,
			required: true
	},
	g2outerR: {
			type: Number,
			default: 100,
			required: true
	},
	jX: {
			type: Number,
			default: 100,
			required: true
	},
	jY: {
			type: Number,
			default: 100,
			required: true
	}

});

module.exports = mongoose.model('cords', cordSchema);