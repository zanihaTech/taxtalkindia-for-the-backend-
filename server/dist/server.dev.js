"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

require('dotenv').config();

var app = express(); // Middleware

app.use(cors({
  origin: 'http://localhost:3000',
  // Allow requests only from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // Allow these HTTP methods

}));
app.use(express.json());
app.use('/uploads', express["static"]('uploads')); // MongoDB Connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connected to MongoDB');
})["catch"](function (err) {
  return console.error('MongoDB connection error:', err);
}); // Routes

var authRoutes = require('./routes/authRoutes');

var blogRoutes = require('./routes/blogRoutes');

app.use('/api/auth', authRoutes); // For authentication

app.use('/api/posts', blogRoutes); // For blog posts
// Start Server

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});
//# sourceMappingURL=server.dev.js.map
