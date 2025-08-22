import React, { useState, useEffect } from 'react'
import { GraduationCap, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

interface LandingAnimationProps {
  onComplete: () => void
}

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTitle(true), 500)
    const timer2 = setTimeout(() => setShowSubtitle(true), 1200)
    const timer3 = setTimeout(() => setShowSparkles(true), 1800)
    const timer4 = setTimeout(() => setShowButton(true), 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const handleSignIn = () => {
    onComplete()
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* --- Spline Background (Particles) --- */}
      <iframe
        src="https://my.spline.design/particles-YbbzEPCC33RSA3vcv92K0aP8/"
        frameBorder="0"
        className="fixed top-0 left-0 w-full h-full z-0"
      ></iframe>

      {/* --- Dark Overlay for readability --- */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* --- Animation Content --- */}
      <div id="landing" className="relative z-20 text-center space-y-8 px-4">
        {/* Logo Animation */}
        <div className="relative">
          <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transform transition-all duration-1000 ease-out animate-bounce">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
          
          {showSparkles && (
            <>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 h-4 w-4 text-blue-400 animate-pulse delay-300" />
              <Sparkles className="absolute top-4 -left-4 h-5 w-5 text-purple-400 animate-pulse delay-500" />
            </>
          )}
        </div>

        {/* Title Animation */}
        <div className="space-y-4">
          <h1 
            className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transform transition-all duration-1000 ease-out ${
              showTitle ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            T&amp;P Cell
          </h1>
          
          <h2 
            className={`text-2xl md:text-3xl font-semibold text-gray-100 transform transition-all duration-1000 ease-out delay-300 ${
              showSubtitle ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            &amp; Higher Studies
          </h2>
        </div>

        {/* Subtitle */}
        <p 
          className={`text-lg text-gray-200 max-w-md mx-auto transform transition-all duration-1000 ease-out delay-700 ${
            showSubtitle ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          Empowering your career journey with intelligent placement solutions
        </p>

        {/* Sign In Button */}
        <div 
          className={`transform transition-all duration-1000 ease-out delay-1000 ${
            showButton ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <Button
            onClick={handleSignIn}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-2">Sign In</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Loading Animation - Only show before button appears */}
        {!showButton && (
          <div className="flex justify-center space-x-2 mt-8">
            <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
            <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>
    </div>
  )
}
