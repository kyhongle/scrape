var mongoose = require("mongoose");
var schema = mongoose.Schema;
var articleSchema = new schema({
  title: { type: String, required: true, unique: true },
  link: { type: String, required: true }
});

var article = mongoose.model("Article", articleSchema);
module.exports = article;
