# Conversational AI Builder

This project creates a simple, white-labeled Conversational AI Builder with a clean UI. It allows users to interact with a Google Gemini-powered AI bot via text or voice input, and receive both text and voice responses.

## Features

- **Voice Input**: Uses Web Speech API for speech-to-text conversion.
- **AI Generation**: Powered by Google Gemini API for conversational responses.
- **Voice Output**: Integrates with OpenTTS for natural-sounding speech synthesis.
- **Audio Playback**: Provides controls to play back generated voice responses.
- **Clean UI**: Simple and intuitive user interface.
- **Loading States**: Visual feedback during processing.

## Technical Stack

- **Frontend**: React (TypeScript)
- **Backend**: Node.js with Express
- **AI Model**: Google Gemini API
- **Text-to-Speech**: OpenTTS
- **Speech-to-Text**: Web Speech API

## Setup Instructions

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd conversational-ai-builder
```

### 2. Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

#### Configuration

Create a `.env` file in the `backend` directory with your API keys and OpenTTS URL:

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
OPENTTS_URL=http://localhost:5002 # Replace with your OpenTTS server URL
```

- **`GEMINI_API_KEY`**: Obtain this from [Google AI Studio](https://ai.google.dev/).
- **`OPENTTS_URL`**: This should be the URL where your OpenTTS server is running. See the OpenTTS Setup section below.

#### Run the Backend

```bash
npm start
```

The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup

Navigate to the `frontend` directory and install dependencies:

```bash
cd ../frontend
npm install
```

#### Run the Frontend

```bash
npm start
```

The frontend application will open in your browser, usually at `http://localhost:3000`.

### 4. Eleven Labs Setup (Text-to-Speech Service)

This project uses Eleven Labs for text-to-speech synthesis. You will need an Eleven Labs account to set this up.

#### 1. Create an Eleven Labs Account

If you don't have one, create an Eleven Labs account here: [https://elevenlabs.io/](https://elevenlabs.io/)

#### 2. Get Your API Key and Voice ID

1. Log in to your Eleven Labs account.
2. Navigate to your Profile settings to find your API Key.
3. Browse the Voice Library or your created voices to find a Voice ID you'd like to use. A common default is "21m00Tcm4TlvDq8ikWAM" (Adam).

#### 3. Update Backend Configuration

Add your Eleven Labs API Key and desired Voice ID to the `.env` file in your `backend` directory:

```
ELEVENLABS_API_KEY=YOUR_ELEVENLABS_API_KEY
ELEVENLABS_VOICE_ID=YOUR_ELEVENLABS_VOICE_ID
```

- **`ELEVENLABS_API_KEY`**: Your API Key from Eleven Labs.
- **`ELEVENLABS_VOICE_ID`**: The ID of the voice you want to use (e.g., `21m00Tcm4TlvDq8ikWAM`).

## Usage

1. Ensure both the backend and frontend servers are running.
2. Ensure your OpenTTS server is running and accessible at the `OPENTTS_URL` configured in your backend's `.env` file.
3. Open the frontend application in your browser (`http://localhost:3000`).
4. Click the "Start Recording" button to speak your prompt.
5. The transcribed text will appear, followed by the AI's response.
6. For bot responses, a "Play Audio" button will appear, allowing you to listen to the synthesized speech.

## Project Structure

```
conversational-ai-builder/
├── backend/
│   ├── node_modules/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   └── react-app-env.d.ts
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── tsconfig.json
├── gemini_rules/
│   ├── debug.md
│   ├── GEMINI.md
│   ├── memory.md
│   └── tasklist.md
└── README.md
```

## Contributing

Feel free to fork the repository and contribute. Please ensure your code adheres to the existing style and quality guidelines.

## License

This project is open-source and available under the [MIT License](LICENSE). (You might want to create a LICENSE file)
