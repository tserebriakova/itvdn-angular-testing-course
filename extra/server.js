const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const StorageService = require('./storage.service');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const storageService = new StorageService(__dirname + '/data.json'); // Create an instance of your StorageService

// GET endpoint to retrieve all figure items
app.get('/figure-items', (req, res) => {
  const figureItems = storageService.getAllItems();
  res.json(figureItems);
});

// POST endpoint to add a new figure item
app.post('/figure-items', (req, res) => {
  const figureItem = req.body;
  storageService.addItem(figureItem);
  res.json(figureItem);
});

// DELETE endpoint to remove a figure item by ID
app.delete('/figure-items/:id', (req, res) => {
  const itemId = req.params.id;
  const removedSuccessfully = storageService.deleteItem(itemId);
  !removedSuccessfully && res.status(400);
  res.json(itemId);
});

// PUT endpoint to update a figure item by ID
app.put('/figure-items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  storageService.updateItem(itemId, updatedItem);
  res.json(itemId);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

