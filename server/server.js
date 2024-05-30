const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

const dbConfig = require('./dbSetup');

const paymentRoute= require("./routes/paymentRoute")
const usersRoute = require("./routes/userRoute");
const roomsRoute = require('./routes/roomsRoute');
const bookingRoute = require("./routes/bookingRoute");

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"], // Update this with your client URL
  methods: ["POST", "GET"],
  credentials: true
}));

// API Routes
app.use("/api/payments",paymentRoute);
app.use('/api/book', bookingRoute);
app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
