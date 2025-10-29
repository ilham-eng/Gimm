const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas (persistent)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/persistent-server');

// Data Schema
const dataSchema = new mongoose.Schema({
  key: String,
  value: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', dataSchema);

app.use(express.json());

// API Routes
app.get('/', async (req, res) => {
  const count = await Data.countDocuments();
  res.json({ 
    message: 'Persistent Server Running!',
    totalRecords: count,
    timestamp: new Date().toISOString()
  });
});

app.post('/data', async (req, res) => {
  try {
    const { key, value } = req.body;
    const data = new Data({ key, value });
    await data.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/data/:key', async (req, res) => {
  const data = await Data.find({ key: req.params.key }).sort({ timestamp: -1 });
  res.json(data);
});

// Local file persistence
app.post('/save-file', async (req, res) => {
  try {
    const { filename, content } = req.body;
    const filePath = path.join(__dirname, 'persistent-data', filename);
    await fs.writeFile(filePath, content);
    res.json({ success: true, message: 'File saved locally' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Persistent server running on port ${PORT}`);
});
