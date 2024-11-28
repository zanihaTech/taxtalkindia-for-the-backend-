"use strict";

var mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Admin', adminSchema);
//# sourceMappingURL=Admin.dev.js.map
