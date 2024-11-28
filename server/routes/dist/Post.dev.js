"use strict";

var express = require('express');

var router = express.Router();

var Post = require('../models/Post'); // Correct relative path to the Post model
// Example route


router.get('/trending', function _callee(req, res) {
  var trendingPosts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Post.find().sort({
            likes: -1
          }).limit(5));

        case 3:
          trendingPosts = _context.sent;
          // Sort by likes in descending order
          res.json(trendingPosts);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Error fetching trending posts',
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;
//# sourceMappingURL=Post.dev.js.map
