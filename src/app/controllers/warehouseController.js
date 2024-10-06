const Warehouse = require('../models/warehouse');


exports.addWarehouse = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;
    const newWarehouse = new Warehouse({ name, location, capacity });
    await newWarehouse.save();
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ message: 'Error adding warehouse', error });
  }
};


exports.updateWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating warehouse', error });
  }
};


exports.deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.status(200).json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting warehouse', error });
  }
};


exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Error getting warehouses', error });
  }
};








exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.status(200).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: 'Error getting warehouse', error });
  }
};
