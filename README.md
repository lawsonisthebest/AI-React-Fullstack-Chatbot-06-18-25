# Higgins AI

A modern AI chat application built with Next.js, Firebase, and Google's Gemini AI. Higgins AI provides a conversational interface powered by advanced language models with secure authentication and real-time chat capabilities.

## Website
https://react-fullstack-ai-chatbot-06-18-25.vercel.app/

## Features

- 🤖 **AI-Powered Chat**: Powered by Google's Gemini AI for intelligent conversations
- 🔐 **Secure Authentication**: Firebase Authentication with Google OAuth
- 💬 **Real-time Chat**: Instant messaging with AI responses
- 📱 **Modern UI**: Clean, responsive design built with Tailwind CSS
- 🔄 **Chat History**: Persistent chat sessions stored in Firebase
- ⚡ **Fast Performance**: Built with Next.js 14 App Router

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth, NextAuth.js
- **Database**: Firebase Firestore
- **AI**: Google Gemini API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Firebase project
- Google Gemini API key

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd higgins-ai
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GEMINI_API_KEY=your-gemini-api-key
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_PRIVATE_KEY=your-firebase-private-key
```

4. Add your Firebase service account key:
   Place your `serviceAccountKey.json` file in the root directory (this file is gitignored for security).

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
higgins-ai/
├── app/                    # Next.js App Router pages
│   ├── chat/[id]/         # Dynamic chat routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Chat.tsx          # Main chat interface
│   ├── ChatInput.tsx     # Message input component
│   ├── Login.tsx         # Authentication component
│   └── SideBar.tsx       # Navigation sidebar
├── lib/                  # Utility libraries
│   ├── gemini.ts         # Gemini AI integration
│   └── queryApi.ts       # API query utilities
├── pages/api/            # API routes
│   ├── askQuestion.ts    # AI question endpoint
│   └── auth/             # Authentication endpoints
└── firebase.ts           # Firebase configuration
```

## Deployment

The easiest way to deploy Higgins AI is using the [Vercel Platform](https://vercel.com/new).

1. Push your code to a Git repository
2. Import your project to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
