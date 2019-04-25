var express = require("express");
var routes = require("./routes");
var mongoose = require("mongoose");

var app = express();
var PORT = process.env.PORT || 8000;
var mongo_uri = process.env.MONGO_URI || "mongodb://localhost/articleScrape";
mongoose.connect(mongo_uri, {
  useNewUrlParser: true
});

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// app.engine("handlebars", expressHB({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");
app.use(routes);

app.listen(PORT, function() {
  console.log("listening on PORT " + PORT);
});
