const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve the static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
