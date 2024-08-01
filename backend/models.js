const mongoose = require('mongoose');

// User schema and model
const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    organization: String,
    password: String,
    role: String
});

// Inventory schema and model
const InventorySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    availability: String,
    type: String
});

// Booking schema and model
const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
    startDate: Date,
    status: String, 
    rentalPeriod: String,
    createdAt: { type: Date, default: Date.now }
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

module.exports = { User, Inventory, Booking };