const express = require("express");
const router = express.Router();

router.use(express.json());

const {getVid} = require("../controllers/products");

router.route("/").post(getVid);

module.exports = router;