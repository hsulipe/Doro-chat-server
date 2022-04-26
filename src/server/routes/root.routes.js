const { Router } = require("express");
const helloWorldController = require('../controllers/hello-world')

const router = new Router();

router.get("/", helloWorldController);

module.exports = router;
