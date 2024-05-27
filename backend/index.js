const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000; 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // to hash passwords

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

// User schema and model
const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    organization: String,
    password: String
});
const User = mongoose.model('User', UserSchema);


app.get('/',(req,res)=>{
    res.status(200).send("Hello from the server") 
})



// login
app.post('/api/auth/login', async (req, res) => {
    console.log("Login request received");
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
    console.log("User logged in successfully");
    // Return a success response
    const userData= {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        organization: user.organization
    }
    
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
            password: hashedPassword
        });

        const response = await newUser.save();
        console.log("User created successfully", response);
        return res.status(201).json({ message: 'User registered successfully', user: response });
    } catch (error) {
        console.log("An erroe occured while creating user ",error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
