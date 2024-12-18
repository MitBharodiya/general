const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Handle the root route and render the index.ejs view
app.get("/", (req, res) => {
    res.render("index"); // This will render views/index.ejs
});

// Handle Socket.io connections
io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for 'send-location' event and log the location data
    socket.on("send-location", (data) => {
        console.log("Received location:", data);

        // Optionally, broadcast this data to all connected clients
        io.emit("location-update", data);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
