const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes for user registration and login
app.use('/api/users', userRoutes);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Home route to render the profile page
app.get('/', (req, res) => {
    res.render('index', { distanceTraveled: 0, description: 'User Description' });
});

// Create HTTP server and set up Socket.io
const server = require('http').createServer(app);
const io = socketIo(server);

// Listen for location updates from clients
io.on('connection', (socket) => {
    console.log('User connected');
    
    socket.on('send-location', async (data) => {
        const { latitude, longitude } = data;

        // Update location in the database (assumes user is authenticated and we know the userId)
        const user = await User.findById(socket.userId);  // Replace with proper authentication

        // Store location and calculate distance
        user.locationHistory.push({ latitude, longitude });
        // Calculate distance and update user.distanceTraveled (refer to previous distance logic)

        await user.save();
        
        socket.emit('location-update', {
            latitude,
            longitude,
            distanceTraveled: user.distanceTraveled
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
