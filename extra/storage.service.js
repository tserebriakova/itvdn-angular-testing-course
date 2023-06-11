const fs = require('fs');

class StorageService {
  constructor(filePath) {
    this.filePath = filePath;
  }

  readData() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading data from file:', error);
      return [];
    }
  }

  writeData(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data), 'utf8');
      console.log('Data written to file successfully.');
    } catch (error) {
      console.error('Error writing data to file:', error);
    }
  }

  getAllItems() {
    return this.readData();
  }

  getItemById(id) {
    const items = this.readData();
    return items.find((item) => item.id === id);
  }

  addItem(item) {
    const items = this.readData();
    items.push(item);
    this.writeData(items);
  }

  updateItem(id, updatedItem) {
    const items = this.readData();
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      this.writeData(items);
    }
  }

  deleteItem(id) {
    const items = this.readData();
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.splice(index, 1);
      this.writeData(items);
      return true;
    }
    return false;
  }
}

module.exports = StorageService;

