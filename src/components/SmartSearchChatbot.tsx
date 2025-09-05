import React, { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Send, Bot, User, Search, X } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface SearchResult {
  id: string
  title: string
  content: string
  section: string
  url: string
}

export function SmartSearchChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you with your career journey today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearch, setShowSearch] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Mock site content for search
  const siteContent: SearchResult[] = [
    {
      id: '1',
      title: 'T&P Cell Overview',
      content: 'Empowering your career journey with intelligent placement solutions. Welcome to the Training and Placement Cell portal.',
      section: 'landing',
      url: '#landing'
    },
    {
      id: '2',
      title: 'Job Search',
      content: 'Find your dream job with our intelligent job matching system. Browse through thousands of opportunities from top companies.',
      section: 'job-search',
      url: '/job-search'
    },
    {
      id: '3',
      title: 'Placements',
      content: 'Explore placement highlights, recent offers, and top recruiters.',
      section: 'placements',
      url: '/placements'
    },
    {
      id: '4',
      title: 'Higher Studies',
      content: 'Guidance for pursuing higher education and research. Get expert advice on universities, programs, and application processes.',
      section: 'higher-studies',
      url: '/higher-studies'
    },
    {
      id: '5',
      title: 'Skill Mapper',
      content: 'Map and develop your skills for career growth. Identify skill gaps and find resources to enhance your professional capabilities.',
      section: 'skill-mapper',
      url: '/skill-mapper'
    },
    {
      id: '6',
      title: 'Statement of Purpose Assistant',
      content: 'Get help writing compelling statements of purpose. Our AI-powered tool helps you craft impactful applications for higher studies.',
      section: 'sop-assistant',
      url: '/sop-assistant'
    },
    {
      id: '7',
      title: 'About Us',
      content: 'Learn about Maharshi Karve Stree Shikshan Samstha and the college.',
      section: 'about',
      url: '/about'
    },
    {
      id: '11',
      title: 'AI Chat Assistant',
      content: 'Get instant help with your career questions. Our AI assistant provides personalized guidance and support.',
      section: 'chat',
      url: '#chat'
    },
    {
      id: '12',
      title: 'Career Guidance',
      content: 'Professional career counseling and guidance services. Get expert advice on career planning and development.',
      section: 'guidance',
      url: '#guidance'
    }
  ]

  // Mock AI responses for when API is not available
  const mockResponses = [
    "I understand you're asking about career guidance. Let me help you with that!",
    "That's a great question about job searching. Here are some tips...",
    "For scholarship applications, I'd recommend focusing on your unique experiences.",
    "When it comes to higher studies, it's important to research your options thoroughly.",
    "Skill development is crucial for career growth. Let me suggest some resources.",
    "I can help you with your statement of purpose. What specific aspects would you like to focus on?",
    "Job offer analysis is important. Consider factors like growth opportunities and work-life balance.",
    "Internships are excellent for gaining practical experience. Let me guide you through the process."
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const results = siteContent.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(results)
  }

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value)
    handleSearch(value)
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Try to use OpenAI API if available
      const response = await fetchOpenAIResponse(inputValue)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      // Fallback to mock response
      const mockResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: mockResponse,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOpenAIResponse = async (message: string): Promise<string> => {
    // This would be your actual OpenAI API call
    // For now, we'll simulate an API call that might fail
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY || localStorage.getItem('openai_api_key')
    
    if (!apiKey) {
      throw new Error('No API key available')
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful career guidance assistant for a T&P Cell portal. Provide helpful, professional advice about job searching, scholarships, higher studies, and career development.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 150
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response at the moment.'
    } catch (error) {
      throw new Error('API call failed')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Smart Search Bar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <div ref={searchRef} className="relative">
          <div className="flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <Search className="h-4 w-4 text-gray-400 ml-3" />
            <Input
              type="text"
              placeholder="Search the entire site..."
              value={searchQuery}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onFocus={() => setShowSearch(true)}
              className="border-0 bg-transparent focus:ring-0 placeholder:text-gray-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setSearchResults([])
                }}
                className="h-6 w-6 p-0 mr-2"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          {/* Search Results Dropdown */}
          {showSearch && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto z-50">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery('')
                    setSearchResults([])
                    // Navigate to the section/page
                    if (result.url.startsWith('#')) {
                      // Scroll to section
                      const element = document.querySelector(result.url)
                      element?.scrollIntoView({ behavior: 'smooth' })
                    } else {
                      // Navigate to page
                      window.location.href = result.url
                    }
                  }}
                  className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {highlightText(result.title, searchQuery)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {highlightText(result.content, searchQuery)}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="pb-3 border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-blue-600" />
              AI Assistant
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}>
                    {message.isUser ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}