var router = require("express").Router();
var viewRoutes = require("./views");
var apiRoutes = require("./api");
router.use("/api", apiRoutes);
router.use("/", viewRoutes);
module.exports = router;
