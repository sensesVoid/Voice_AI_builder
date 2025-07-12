const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

const path = require('path');
const fs = require('fs');

// Define app here so it's available for middleware
const app = express();
const port = process.env.PORT || 5000;

console.log('Initial GEMINI_API_KEY from process.env:', process.env.GEMINI_API_KEY ? `${process.env.GEMINI_API_KEY.substring(0, 5)}...${process.env.GEMINI_API_KEY.substring(process.env.GEMINI_API_KEY.length - 5)}` : 'Not set');

console.log('Current directory (__dirname):', __dirname);
const envFilePath = path.resolve(__dirname, '.env');
console.log('Resolved .env file path:', envFilePath);

const dotenvResult = dotenv.config({ path: envFilePath });
if (dotenvResult.error) {
  console.error('Error loading .env file:', dotenvResult.error);
}
console.log('Loaded .env from path (dotenv result):', dotenvResult.path);

// Read .env file directly to confirm content
try {
  const envContent = fs.readFileSync(envFilePath, 'utf8');
  console.log('Content of .env file (direct read):', envContent);
} catch (readError) {
  console.error('Error reading .env file directly:', readError.message);
}

const geminiApiKey = process.env.GEMINI_API_KEY;
console.log('Gemini API Key (from process.env AFTER dotenv, first 5 and last 5 chars): ', geminiApiKey ? `${geminiApiKey.substring(0, 5)}...${geminiApiKey.substring(geminiApiKey.length - 5)}` : 'Not set');

// Middleware
app.use(cors());
app.use(express.json());

// Gemini API setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// Gemini Chat Endpoint
app.post('/gemini-chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('Received prompt for Gemini:', prompt);
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Gemini response text:', text);
    res.json({ text });
  } catch (error) {
    console.error('Error interacting with Gemini API:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

// Eleven Labs Speech Synthesis Endpoint
app.post('/synthesize-speech', async (req, res) => {
  const { text, voice } = req.body;
  console.log('Received text for Eleven Labs synthesis:', text);
  console.log('Received voice parameter:', voice);

  if (!text) {
    return res.status(400).json({ error: 'Text is required for speech synthesis' });
  }

  const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
  const elevenLabsVoiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // Default to a common voice ID

  if (!elevenLabsApiKey) {
    return res.status(500).json({ error: 'Eleven Labs API Key is not configured' });
  }

  try {
    const elevenLabsResponse = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}`,
      {
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": elevenLabsApiKey,
        },
        responseType: "arraybuffer",
      }
    );

    res.set({
      'Content-Type': elevenLabsResponse.headers['content-type'] || 'audio/mpeg',
      'Content-Length': elevenLabsResponse.headers['content-length'],
    });
    res.send(elevenLabsResponse.data);
  } catch (error) {
    console.error('Error synthesizing speech with Eleven Labs:', error.message);
    if (error.response) {
      console.error('Eleven Labs Response Data:', error.response.data.toString());
      console.error('Eleven Labs Response Status:', error.response.status);
    }
    res.status(500).json({ error: 'Failed to synthesize speech with Eleven Labs' });
  }
});

// Add environment check endpoint


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});