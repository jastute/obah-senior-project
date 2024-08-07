const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000; 
const bodyParser = require('body-parser');    
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // to hash passwords
const base64 = require('base-64');
const axios = require('axios');

// Import models
const { User, Inventory, Booking } = require('./models');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
 
require('dotenv').config(); 



// Mongoose connection
mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to MongoDB');
});

// // User schema and model
// const UserSchema = new mongoose.Schema({
//     fullName: String,
//     email: String,
//     phone: String,
//     organization: String,
//     password: String,
//     role: String
// });
// const User = mongoose.model('User', UserSchema);

// // Inventory schema and model
// const InventorySchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     price: String,
//     availability: String,
//     type: String
// });
// const Inventory = mongoose.model('Inventory', InventorySchema);

// //Booking schema and model
// const BookingSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
//     startDate: Date,
//     status: String, 
//     rentalPeriod: String,
//     createdAt: { type: Date, default: Date.now }
// });
// const Booking = mongoose.model('Booking', BookingSchema);


app.get('/',(req,res)=>{
    res.status(200).send("Hello from the server") 
})



// login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
        console.log("Invalid email");
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        console.log("Invalid password");
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log("User logged in successfully", user.role);
    console.log(user);
    // Return a success response
    const userData = {
        userID: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        organization: user.organization,
        role: user.role
      };
    
    return res.status(200).json({ message: 'success', user: userData });
});



// Register
app.post('/api/auth/register', async (req, res) => {
    const { fullName, email, phone, organization, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists", existingUser);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in MongoDB
        const newUser = new User({
            fullName,
            email,
            phone,
            organization,
            password: hashedPassword,
            role: "user"
        });

        const response = await newUser.save();
        console.log("User created successfully", response);
        return res.status(201).json({ message: 'User registered successfully', user: response });
    } catch (error) {
        console.log("An erroe occured while creating user ",error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




// add inventory to database
app.post('/api/addInventory', async (req, res) => {
    const { title, description, price, availability, itemtype } = req.body;
    const newInventory = new Inventory({
        title,
        description,
        price,
        availability,
        type: itemtype
    });
    const response = await newInventory.save();
    console.log("Inventory added successfully", response);
    return res.status(200).json({ message: 'Inventory added successfully', inventory: response });
});


// fetch all inventories from database
app.get('/api/inventory', async (req, res) => {
    const inventories = await Inventory.find();
    return res.status(200).json({ message: 'success', inventory: inventories });
});


// fetch single inventory with id from body
app.get('/api/inventory/:id', async (req, res) => {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);
    return res.status(200).json({ message: 'success', inventory: inventory });
});


// Book an inventory
app.post('/api/rent', async (req, res) => {
    const { userId, equipmentId, startDate, rentalPeriod } = req.body;
    console.log(userId, equipmentId, startDate, rentalPeriod);
    const newBooking = new Booking({
        user: userId,
        inventory: equipmentId,
        startDate,
        rentalPeriod,
        status: 'pending',
        createdAt: Date.now()
    });
    const response = await newBooking.save();
    console.log("Booking added successfully", response);
    return res.status(200).json({ message: 'Booking added successfully', booking: response });
});




// fetch all bookings

app.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate('user', 'fullName phone')
        .populate('inventory', 'title')
      return res.status(200).json({ message: 'success', bookings: bookings });
    } catch (error) {
      return res.status(500).json({ message: 'error', error: error.message });
    }
  });

  // fetch single booking by user id
app.get('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await Booking.find({ user: id })
        .populate('user', 'fullName phone')
        .populate('inventory', 'title price');
        return res.status(200).json({ message: 'success', bookings: bookings });
    } catch (error) {
        return res.status(500).json({ message: 'error', error: error.message });
    }
});
  
  


// change booking status to accepted or rejected
app.put('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    console.log("Booking status updated successfully", booking);
    return res.status(200).json({ message: 'Booking status updated successfully', booking: booking });
});


// change the availability of the inventory
app.put('/api/update/inventory/:id', async (req, res) => {
    const { id } = req.params;
    const { availability } = req.body;
    const inventory = await Inventory.findByIdAndUpdate(id, { availability }, { new: true });
    console.log("Inventory updated successfully", inventory);
    return res.status(200).json({ message: 'Inventory updated successfully', inventory: inventory });
});

// delete an inventory
app.delete('/api/delete/inventory/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const inventory = await Inventory.findByIdAndDelete(id); 
    console.log("Inventory deleted successfully", inventory);
    return res.status(200).json({ message: 'Inventory deleted successfully', inventory: inventory });
});

// delete a booking
app.delete('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    console.log("Booking deleted successfully", booking);
    return res.status(200).json({ message: 'Booking deleted successfully', booking: booking });
});


  
// // function to generate access token 
// async function generateAccessToken() {
//     const consumerKey='nns5OYNb4yoeaFbUyk4kCkfzcfOvMkzyBeukIgtxrpuvOY6Q'
//     const consumerSecret='lCNIQjWymgSrx8KHho2DMVTZ9GUvBPgVRzcr4um1yAXtp6FRHjGlYGOAzTnWyBgg'

//     const auth = `${consumerKey}:${consumerSecret}`;
//     const encodedAuth = Buffer.from(auth).toString('base64');
//     const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
//         method: 'GET',
//         headers: {
//             'Authorization': `Basic ${encodedAuth}`,
//         },
//     });
//     return response.data.access_token;
//     // const data = await response.json();
//     // return data.access_token;
// }



async function generateAccessToken() {
    const consumer_key = 'nns5OYNb4yoeaFbUyk4kCkfzcfOvMkzyBeukIgtxrpuvOY6Q';
    const consumer_secret = 'lCNIQjWymgSrx8KHho2DMVTZ9GUvBPgVRzcr4um1yAXtp6FRHjGlYGOAzTnWyBgg';
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    try {
        const auth = base64.encode(`${consumer_key}:${consumer_secret}`);
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Basic ${auth}`
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.log('Error generating access token:');
        throw error;
    }
}



// INTEGRATE PAYMENT WITH SAFARICOM DARAJA API
app.post('/api/initiate-payment',async (req,res)=>{
    const {amount, phone} = req.body;
    console.log(amount, phone); 
 
    try {
        const token = await generateAccessToken();
        const url='https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        const header = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        const options = {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                BusinessShortCode: '174379',
                Password: 'MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNzMwMTc0NTE3',
                Timestamp: '20240730174517',
                TransactionType: 'CustomerPayBillOnline',
                Amount: amount,
                PartyA: phone,
                PartyB: '174379',
                PhoneNumber: phone,
                CallBackURL: 'https://medrent.vercel.app/',
                AccountReference: 'JASTUTE SOLUTIONS',
                TransactionDesc: 'Payment of medrent equipment rent'
            })
        }
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                res.status(200).json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    } catch (error) {
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            console.error('Request:', error.request);
            res.status(500).send('No response received from server');
        } else {
            console.error('Error Message:', error.message);
            res.status(500).send(error.message);
        }
    }
})








app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
