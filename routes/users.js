'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/u', function (req, res) {
    res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
});


module.exports = router;
