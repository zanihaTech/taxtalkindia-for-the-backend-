"use strict";

var mongoose = require('mongoose');

var BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    "default": 'Admin'
  },
  date: {
    type: Date,
    "default": Date.now
  },
  likes: {
    type: Number,
    "default": 0
  },
  image: {
    type: String
  } // Store image URL

});
module.exports = mongoose.model('BlogPost', BlogPostSchema);
//# sourceMappingURL=BlogPost.dev.js.map
