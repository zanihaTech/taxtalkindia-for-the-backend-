// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');
// // Fetch all posts
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// // Fetch a single post by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching post', error: err.message });
//   }
// });
// module.exports = router;
"use strict";
//# sourceMappingURL=Posts.dev.js.map
