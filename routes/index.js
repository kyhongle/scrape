var router = require("express").Router();
var viewRoutes = require("./views");
// Router.use("/api", apiRoutes)
router.use("/", viewRoutes);
module.exports = router;
