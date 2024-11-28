const express = require('express');
const multer = require('multer');
const BlogPost = require('../models/BlogPost');
const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Fetch trending blog posts (top 5 by likes)
router.get('/trending', async (req, res) => {
  try {
    const trendingPosts = await BlogPost.find({}, { title: 1, likes: 1, image: 1 })
      .sort({ likes: -1 })
      .limit(5);
    res.json(trendingPosts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trending posts', error: err.message });
  }
});

// Fetch all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 }); // Sort by newest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});

// Fetch a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching the post', error: err.message });
  }
});

// Create a new blog post
router.post('/create', upload.single('imageFile'), async (req, res) => {
  console.log('Uploaded file:', req.file); // Debug uploaded file
  console.log('Request body:', req.body); // Debug request body
  const { title, content, author } = req.body;
  const imageFile = req.file ? '/uploads/' + req.file.filename : null;

  try {
    const newPost = new BlogPost({
      title,
      content,
      author: author || 'Admin',
      image: imageFile,
      likes: 0,
      date: new Date(),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Return the created post
  } catch (err) {
    res.status(500).json({ message: 'Error creating the post', error: err.message });
  }
});

// Update a blog post by ID
router.put('/:id', upload.single('imageFile'), async (req, res) => {
  const { title, content, author } = req.body;
  const imageFile = req.file ? '/uploads/' + req.file.filename : null;

  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, author, image: imageFile || req.body.image },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error updating the post', error: err.message });
  }
});

// Delete a blog post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully', post: deletedPost });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting the post', error: err.message });
  }
});

// Like a blog post by ID
router.put('/:id/like', async (req, res) => {
  try {
    const likedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!likedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(likedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error liking the post', error: err.message });
  }
});

// Search for blog posts with pagination and sorting
router.get('/search', async (req, res) => {
  const searchQuery = req.query.query?.trim(); // Get the search query
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 results per page
  const sortBy = req.query.sortBy || 'date'; // Default sort by date
  const order = req.query.order === 'asc' ? 1 : -1; // Default to descending order

  if (!searchQuery) {
    return res.status(400).json({ message: 'No search query provided' });
  }

  try {
    // Perform a case-insensitive search in the title and content fields
    const regex = new RegExp(searchQuery, 'i');
    const results = await BlogPost.find({
      $or: [{ title: regex }, { content: regex }],
    })
      .sort({ [sortBy]: order }) // Sort by specified field
      .skip((page - 1) * limit) // Skip documents for pagination
      .limit(limit); // Limit the number of results

    const totalResults = await BlogPost.countDocuments({
      $or: [{ title: regex }, { content: regex }],
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No blogs found matching your query' });
    }

    res.json({
      totalResults,
      currentPage: page,
      totalPages: Math.ceil(totalResults / limit),
      results,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error searching posts', error: err.message });
  }
});



module.exports = router;
