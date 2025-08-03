// Import necessary modules
const express = require('express');
const path = require('path');

// Initialize the Express app
const app = express();

// Define the port the server will run on. 
// Use the environment's port if available (for hosting), otherwise default to 3000
const PORT = process.env.PORT || 3000;

// --- Middleware ---

// Serve static files (like HTML, CSS, images) from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Parse incoming JSON payloads. This is needed to read data from the contact form.
app.use(express.json());

// Parse URL-encoded payloads. This is another way forms can send data.
app.use(express.urlencoded({ extended: true }));


// --- Routes ---

// API endpoint for the contact form
app.post('/submit-form', (req, res) => {
    // The form data sent from the frontend will be in req.body
    const { name, email, subject, message } = req.body;

    // --- Backend Logic Here ---
    // This is where you would process the form data. For example:
    // 1. Validate the data (e.g., check if email is valid).
    // 2. Send an email notification to yourself (using a service like Nodemailer).
    // 3. Save the message to a database.

    console.log('Received new message:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Send a success response back to the frontend
    // The status(200) means 'OK'
    res.status(200).json({ message: 'Form submitted successfully!' });
});

// Catch-all route to serve the main index.html for any other request
// This helps with client-side routing if you add it later.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


// --- Start the Server ---

// Make the server listen for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
