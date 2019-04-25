var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NoteSchema = new Schema({
  articleId: { type: Schema.Types.ObjectId, ref: "Article" },
  date: { type: Date, default: Date.now },
  text: { type: String, required: "please input something" }
});

var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
