var router = require("express").Router();
var db = require("../../models");
var axios = require("axios");
var cheerio = require("cheerio");

router.get("/articles", function(req, res) {
  db.Article.find({}).then(function(data, err) {
    res.json(data);
  });
});

router.post("/notes", function(req, res) {
  db.Note.insertMany(req.body).then(function(data, err) {
    res.json(data);
  });
});

router.get("/articles/:id", function(req, res) {
  db.Note.find({ articleId: req.params.id }).then(function(data, err) {
    res.json(data);
  });
});

router.get("/delete/:id", function(req, res) {
  db.Note.remove({ articleId: req.params.id }).then(function(data, err) {
    res.send(data);
  });
});

router.get("/scrape", function(req, res) {
  axios.get("https://www.refinery29.com/en-us").then(function(response) {
    // Load the body of the HTML into cheerio
    var $ = cheerio.load(response.data);

    // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
    $("div.card.featured-story").each(function(i, element) {
      var result = {};
      // Save the text of the h4-tag as "title"
      result.title = $(this)
        .find("div.title")
        .children()
        .text();

      // Find the h4 tag's parent a-tag, and save it's href value as "link"
      result.link = $(this)
        .children()
        .attr("href");

      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    res.send("Finished Scraping");
  });
});

module.exports = router;
