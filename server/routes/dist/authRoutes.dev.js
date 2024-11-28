"use strict";

var express = require('express');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var Admin = require('../models/Admin'); // Ensure this path is correct


var router = express.Router(); // Admin login route

router.post('/login', function _callee(req, res) {
  var _req$body, username, password, admin, isMatch, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Admin.findOne({
            username: username
          }));

        case 4:
          admin = _context.sent;

          if (admin) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, admin.password));

        case 9:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid credentials'
          }));

        case 12:
          // Generate JWT token
          token = jwt.sign({
            id: admin._id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.json({
            token: token
          });
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
module.exports = router;
//# sourceMappingURL=authRoutes.dev.js.map
