const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const router = require("./router/routes");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS middleware for Express
app.use(cors({
  origin: "https://simple-chatapp-six.vercel.app", // Use your specific client URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allows cookies to be sent if needed
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://simple-chatapp-six.vercel.app", // Use your client URL
    methods: ["GET", "POST"],
    credentials: true, // Allows sending of cookies with requests
  },
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Global io instance for accessing it elsewhere
global.io = io;

// Routes
app.get("/", async (req, res) => {
  res.send({
    success: true,
    message: "Welcome to the ChatApp!",
  });
});

connectDB(); // Connect to database

app.use(router); // Use your defined routes

// Start the server using the HTTP server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app };
