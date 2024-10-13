const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // For URL-encoded form data

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/contactForm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for storing contact form data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  phone: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
  res.send("Testing Contact Form!");
});
// API to handle form submissions
app.post("/api/contact", async (req, res) => {
  console.log("logging below");
  console.log(req.body); // Log incoming data

  const { name, email, subject, phone, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      phone,
      message,
    });
    await newContact.save();
    res.status(201).json({ message: "Contact information saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save contact information" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
