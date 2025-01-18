const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard'); // Import the dashboard route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Use the dashboard route (protected)
app.use('/api', dashboardRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('FirmSync API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
