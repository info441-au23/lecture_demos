var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('lists out all the users');
});

/* GET a specific user */
router.get('/:userId', function(req, res, next) {
  const userId = req.params.userId;
  res.send(`Details for user ${userId}`);
});

module.exports = router;
