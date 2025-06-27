const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/verify-captcha', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'No token provided' });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET;
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: secretKey,
        response: token
      }
    });

    if (response.data.success) {
      res.json({ success: true, message: 'CAPTCHA verified' });
    } else {
      res.status(400).json({ success: false, message: 'CAPTCHA failed', errors: response.data['error-codes'] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(4000, () => {
  console.log('✅ Backend running at http://localhost:4000');
});