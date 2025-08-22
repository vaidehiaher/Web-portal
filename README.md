# T&P Cell Portal

A comprehensive Training and Placement Cell portal with AI-powered features for career guidance and job placement.

## Features

### 🎯 Landing Page
- **Interactive Animation**: Beautiful landing page with animated elements
- **Sign In Flow**: Landing page remains visible until user clicks "Sign In"
- **Modern Design**: Clean, responsive design with gradient backgrounds

### 🤖 AI-Powered Chatbox
- **Smart Assistant**: AI-powered chat interface for career guidance
- **OpenAI Integration**: Connects to OpenAI API for intelligent responses
- **Fallback System**: Uses mock responses when API is unavailable
- **Modern UI**: Clean chat interface with user/AI message distinction
- **Real-time Chat**: Instant message display with typing indicators

### 🔍 Smart Site-wide Search
- **Global Search**: Search through entire site content
- **Keyword Highlighting**: Matched keywords are highlighted in results
- **Smart Navigation**: Click results to jump to relevant sections/pages
- **Dropdown Interface**: Clean search results dropdown
- **Always Available**: Search bar visible on all pages

### 🎨 Design Features
- **Modern UI**: Rounded corners, soft shadows, and light colors
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Automatic theme switching
- **Smooth Animations**: Fluid transitions and hover effects

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### OpenAI API Setup (Optional)
To enable AI-powered responses in the chatbox:

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Set the environment variable:
   ```bash
   REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```
   Or store it in localStorage with key `openai_api_key`

### Demo Accounts
The system includes demo accounts for different user roles:
- **Student**: gaurav.agrawal@college.edu / demo123
- **Faculty**: amit.thakre@college.edu / demo123
- **T&P Admin**: tp.admin@college.edu / demo123
- **Recruiter**: recruiter@techcorp.com / demo123
- **System Admin**: admin@college.edu / demo123

## Usage

### Landing Page
1. The landing page displays with animated elements
2. Click "Sign In" to proceed to the login page
3. Use the search bar at the top to search site content
4. Click the chat icon (bottom-right) to open the AI assistant

### Smart Search
1. Type in the search bar at the top of any page
2. Results appear in a dropdown with highlighted keywords
3. Click any result to navigate to that section/page
4. Clear search to reset results

### AI Chatbox
1. Click the chat icon (bottom-right corner)
2. Type your career-related questions
3. Receive AI-powered responses
4. Chat works with or without OpenAI API key

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: OpenAI API (with fallback to mock responses)
- **Icons**: Lucide React
- **Routing**: React Router

## Project Structure

```
src/
├── components/
│   ├── LandingAnimation.tsx    # Landing page with animations
│   ├── SmartSearchChatbot.tsx  # AI chatbox and search
│   ├── LoginForm.tsx          # Authentication form
│   └── ui/                    # Reusable UI components
├── pages/                     # Main application pages
├── contexts/                  # React contexts
└── types/                     # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.