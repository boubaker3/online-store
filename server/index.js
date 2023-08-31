require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cors = require("cors");
const port = 80;

// Enable CORS before handling API routes
app.use(cors());

app.use(express.json());

// API routes setup
const authRouter = require("./routes/Users");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Orders");
const reviewsRouter = require("./routes/Reviews");
const contactsRouter = require("./routes/Contacts");

app.use("/", authRouter);
app.use("/", cartRouter);
app.use("/", ordersRouter);
app.use("/", reviewsRouter);
app.use("/", contactsRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// Serve static files for React client
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${port}`);
});
