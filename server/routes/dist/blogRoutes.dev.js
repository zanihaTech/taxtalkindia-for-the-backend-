"use strict";

var express = require('express');

var multer = require('multer');

var BlogPost = require('../models/BlogPost');

var router = express.Router(); // Multer configuration for file uploads

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './uploads/'); // Directory to store uploaded files
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});
var upload = multer({
  storage: storage
}); // Fetch trending blog posts (top 5 by likes)

router.get('/trending', function _callee(req, res) {
  var trendingPosts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(BlogPost.find({}, {
            title: 1,
            likes: 1,
            image: 1
          }).sort({
            likes: -1
          }).limit(5));

        case 3:
          trendingPosts = _context.sent;
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
}); // Fetch all blog posts

router.get('/', function _callee2(req, res) {
  var posts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(BlogPost.find().sort({
            date: -1
          }));

        case 3:
          posts = _context2.sent;
          // Sort by newest first
          res.json(posts);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: 'Error fetching posts',
            error: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Fetch a single blog post by ID

router.get('/:id', function _callee3(req, res) {
  var post;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(BlogPost.findById(req.params.id));

        case 3:
          post = _context3.sent;

          if (post) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Post not found'
          }));

        case 6:
          res.json(post);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Error fetching the post',
            error: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Create a new blog post

router.post('/create', upload.single('imageFile'), function _callee4(req, res) {
  var _req$body, title, content, author, imageFile, newPost, savedPost;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log('Uploaded file:', req.file); // Debug uploaded file

          console.log('Request body:', req.body); // Debug request body

          _req$body = req.body, title = _req$body.title, content = _req$body.content, author = _req$body.author;
          imageFile = req.file ? '/uploads/' + req.file.filename : null;
          _context4.prev = 4;
          newPost = new BlogPost({
            title: title,
            content: content,
            author: author || 'Admin',
            image: imageFile,
            likes: 0,
            date: new Date()
          });
          _context4.next = 8;
          return regeneratorRuntime.awrap(newPost.save());

        case 8:
          savedPost = _context4.sent;
          res.status(201).json(savedPost); // Return the created post

          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](4);
          res.status(500).json({
            message: 'Error creating the post',
            error: _context4.t0.message
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[4, 12]]);
}); // Update a blog post by ID

router.put('/:id', upload.single('imageFile'), function _callee5(req, res) {
  var _req$body2, title, content, author, imageFile, updatedPost;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, title = _req$body2.title, content = _req$body2.content, author = _req$body2.author;
          imageFile = req.file ? '/uploads/' + req.file.filename : null;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(BlogPost.findByIdAndUpdate(req.params.id, {
            title: title,
            content: content,
            author: author,
            image: imageFile || req.body.image
          }, {
            "new": true
          }));

        case 5:
          updatedPost = _context5.sent;

          if (updatedPost) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Post not found'
          }));

        case 8:
          res.json(updatedPost);
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](2);
          res.status(500).json({
            message: 'Error updating the post',
            error: _context5.t0.message
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 11]]);
}); // Delete a blog post by ID

router["delete"]('/:id', function _callee6(req, res) {
  var deletedPost;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(BlogPost.findByIdAndDelete(req.params.id));

        case 3:
          deletedPost = _context6.sent;

          if (deletedPost) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: 'Post not found'
          }));

        case 6:
          res.json({
            message: 'Post deleted successfully',
            post: deletedPost
          });
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: 'Error deleting the post',
            error: _context6.t0.message
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Like a blog post by ID

router.put('/:id/like', function _callee7(req, res) {
  var likedPost;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(BlogPost.findByIdAndUpdate(req.params.id, {
            $inc: {
              likes: 1
            }
          }, {
            "new": true
          }));

        case 3:
          likedPost = _context7.sent;

          if (likedPost) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: 'Post not found'
          }));

        case 6:
          res.json(likedPost);
          _context7.next = 12;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            message: 'Error liking the post',
            error: _context7.t0.message
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.get('/search', function _callee8(req, res) {
  var search, searchRegex, posts;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          search = req.query.search; // Get the search term from the query

          console.log('Search Query:', search); // Debugging the search term

          if (search) {
            _context8.next = 4;
            break;
          }

          return _context8.abrupt("return", res.status(400).json({
            message: 'No search term provided'
          }));

        case 4:
          _context8.prev = 4;
          searchRegex = new RegExp(search, 'i'); // Case-insensitive search

          _context8.next = 8;
          return regeneratorRuntime.awrap(BlogPost.find({
            $or: [{
              title: searchRegex
            }, // Search in title
            {
              content: searchRegex
            } // Search in content
            ]
          }));

        case 8:
          posts = _context8.sent;

          if (!(posts.length === 0)) {
            _context8.next = 11;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            message: 'No posts found matching your query'
          }));

        case 11:
          res.json(posts); // Return matching posts

          _context8.next = 18;
          break;

        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](4);
          console.error('Error during search:', _context8.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context8.t0.message
          });

        case 18:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[4, 14]]);
});
module.exports = router;
//# sourceMappingURL=blogRoutes.dev.js.map
