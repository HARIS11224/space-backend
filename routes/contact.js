const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Setup mail transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'muhammad.haris3761@gmail.com',
        pass: 'jtec nzjz proq vlsz' // Use Gmail app password if 2FA is on
      }
    });

    await transporter.sendMail({
      from: '"SpaceSketch Contact Form" <muhammad.haris3761@gmail.com>', // Authenticated email only
      to: 'muhammad.haris3761@gmail.com',
      replyTo: email,  // So you can reply directly to user's email
      subject: '📩 New Contact Form Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;
