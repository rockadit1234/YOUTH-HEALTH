const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyACljq9pYYE6416MtIyJ7WLLMMWB4M7Ofg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static('build'));

// In-memory storage for demo purposes
let chatHistory = [];
let appointments = [];
let contacts = [];

// API Routes

// Chat endpoint
const axios = require('axios'); // Add this at the top with other requires
// ...existing code...

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log('User message:', message);

  // Store user message
  chatHistory.push({ type: 'user', message, timestamp: new Date() });

  try {
    // Call Gemini API
    const geminiRes = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }]
      }
    );

    const aiResponse =
      geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response at this time.";

    // Store AI response
    chatHistory.push({ type: 'ai', message: aiResponse, timestamp: new Date() });

    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from Gemini API' });
  }
});

// Appointments endpoint
app.post('/api/appointments', (req, res) => {
  const { date, time, name, email } = req.body;
  
  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }
  
  const appointment = {
    id: appointments.length + 1,
    date,
    time: time || 'TBD',
    name: name || 'Anonymous',
    email: email || 'Not provided',
    createdAt: new Date()
  };
  
  appointments.push(appointment);
  
  console.log(`Appointment booked for ${date} at ${time || 'TBD'} by ${name || 'Anonymous'}`);
  
  res.json({ 
    success: true, 
    message: 'Appointment booked successfully',
    appointment 
  });
});

// Contact endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  
  const contact = {
    id: contacts.length + 1,
    name,
    email,
    subject: subject || 'General Inquiry',
    message,
    createdAt: new Date()
  };
  
  contacts.push(contact);
  
  console.log(`Contact form submitted by ${name} (${email}): ${subject}`);
  
  res.json({ 
    success: true, 
    message: 'Thank you for your message. We\'ll get back to you soon!' 
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  // Demo credentials (in real app, this would be validated against a database)
  if (email === 'demo@aura.com' && password === 'demo123') {
    console.log(`User logged in: ${email}`);
    res.json({ 
      success: true, 
      message: 'Login successful',
      token: 'demo-token-' + Date.now(),
      user: { email, name: 'Demo User' }
    });
  } else {
    console.log(`Failed login attempt: ${email}`);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get chat history
app.get('/api/chat/history', (req, res) => {
  res.json({ 
    success: true, 
    history: chatHistory 
  });
});

// Get appointments
app.get('/api/appointments', (req, res) => {
  res.json({ 
    success: true, 
    appointments 
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Aura Mental Health API is running',
    timestamp: new Date()
  });
});

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Aura Mental Health API server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`📅 Appointments: http://localhost:${PORT}/api/appointments`);
  console.log(`📧 Contact: http://localhost:${PORT}/api/contact`);
  console.log(`🔐 Login: http://localhost:${PORT}/api/login`);
});
