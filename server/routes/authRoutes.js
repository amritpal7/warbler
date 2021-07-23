const express = require("express");
const { signUp, signIn } = require("../handlers/auth");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

module.exports = router;
