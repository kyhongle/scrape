var mongoose = require("mongoose");
var schema = mongoose.Schema;
var noteSchema = new schema({
  articleId: { type: schema.Types.ObjectId, ref: "Article" },
  date: { type: Date, default: Date.now },
  text: { type: String, required: true }
});

var note = mongoose.model("Note", noteSchema);
module.exports = note;
