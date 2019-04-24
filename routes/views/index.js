var router = require("express").Router();
var db = require("../../models");

router.get("/", function(req, res) {
  // ToDo: pull all our articles
  res.render("index", { articles: [] });
});

module.exports = router;
