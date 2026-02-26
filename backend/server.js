const express = require('express'); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const cors = require('cors'); 

//creat express and set the port
const app = express(); 
const PORT = process.PORT || 3001; 
const SECRET_KEY = 'hazime';

// Middleware setup
app.use(express.json()); 
app.use(cors());
// MongoDB connection 
const MONGO_URI = 'mongodb+srv://nisrine:hazime1234@final-exam-project.keoflyq.mongodb.net/?retryWrites=true&w=majority&appName=final-exam-project';
//method is used to connect to the MongoDB instance.
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('Connected to MongoDB'); 
})
.catch((error) => {
  console.error('MongoDB connection error:', error); 
  process.exit(1); 
});

// Define User Schema                                                                                                        
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
  password: { type: String, required: true } 
});

// Creates User model based on UserSchema
const User = mongoose.model('User', UserSchema); 

// Register Route - Handles user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body; 

  try {
    console.log('Received registration request:', { username, password });

    // Check if username exists in db
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already exists:', username);
      return res.status(400).send({ message: 'Username already exists' });
    }

    // Hash the password before saving it db
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ username, password: hashedPassword }); 
    await newUser.save(); 
    console.log('User registered successfully:', username);
    res.status(201).send({ message: 'User registered successfully' }); 
  } catch (error) {
    console.error('Error registering user:', error.message);
    if (error.code === 11000) { 
      console.log('Duplicate username error:', username);
      return res.status(400).send({ message: 'Username already exists' });
    }
    res.status(500).send({ message: 'Error registering user' }); 
  }
});

// Login Route  Handles user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body; 
  try {
    console.log('Login attempt for username:', username);

    // Check if user exists in the db
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found:', username);
      return res.status(404).send({ message: 'User not found' });
    }

    // Validate password by comparing with hashed 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password for username:', username);
      return res.status(401).send({ message: 'Invalid password' });
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' }); 
    res.status(200).send({ token }); 
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).send({ message: 'Error logging in user' }); 
  }
});

// Middleware 
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; 
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).send({ message: 'No token provided' }); 
  }

// Verifies the JWT token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token:', err.message);
      return res.status(403).send({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId; 
    next(); 
  });
};


// Starts the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Please use a different port.`);
  } else {
    console.error(err); 
  }
});

