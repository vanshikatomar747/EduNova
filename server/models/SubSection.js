const mongoose = require("mongoose");

//Importing the SubSectionSchema model
const SubSectionSchema = new mongoose.Schema({
	title: { type: String },
	timeDuration: { type: String },
	description: { type: String },
	videoUrl: { type: String },
});

//Exporting the SubSectionSchema
module.exports = mongoose.models.SubSection || mongoose.model("SubSection", SubSectionSchema);