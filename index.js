const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch'); 
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "https://shakirah-portfolio.vercel.app",
}));
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const WHATSAPP_API_BASE_URL = process.env.WHATSAPP_API_BASE_URL;
const WHATSAPP_PHONE_NUMBER = process.env.WHATSAPP_PHONE_NUMBER;
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY;
// POST endpoint to receive appointment data
app.post('/send-whatsapp', async (req, res) => {
  const { name, email, phone, service, date, message } = req.body;

  const fullMessage = encodeURIComponent(
    `New Appointment Booking:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nNotes: ${message}`
  );

  const apiUrl = `${WHATSAPP_API_BASE_URL}?phone=${WHATSAPP_PHONE_NUMBER}&text=${fullMessage}&apikey=${WHATSAPP_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const text = await response.text();
    console.log('API Response:', text);

    if (text.includes("Message successfully sent")) {
      res.json({ success: true, message: "WhatsApp message sent successfully!" });
    } else {
      res.status(500).json({ success: false, message: "Failed to send message", apiResponse: text });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: "Error sending WhatsApp message" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
