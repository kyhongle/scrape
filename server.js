var express = require("express");
var expressHB = require("express-handlebars");
var cheerio = require("cheerio");
var axios = require("axios");
var path = require("path");
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

app.engine("handlebars", expressHB({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(routes);
axios.get("https://www.refinery29.com/en-us").then(function(response) {
  // Load the body of the HTML into cheerio
  var $ = cheerio.load(response.data);

  // Empty array to save our scraped data
  var results = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("div.card.featured-story").each(function(i, element) {
    // Save the text of the h4-tag as "title"
    var title = $(element)
      .find("div.title")
      .children()
      .text();

    // Find the h4 tag's parent a-tag, and save it's href value as "link"
    var link = $(element)
      .children()
      .attr("href");

    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
      title: title,
      link: link
    });
  });

  // After looping through each h4.headline-link, log the results
  console.log(results);
});

app.listen(PORT, function() {
  console.log("listening on PORT " + PORT);
});
