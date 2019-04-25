var router = require("express").Router();

router.get("/", function(req, res) {
  // ToDo: pull all our articles
  res.render("index.html");
});

module.exports = router;
