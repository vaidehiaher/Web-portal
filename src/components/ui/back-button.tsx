import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  className?: string
  label?: string
}

export function BackButton({ className = '', label = 'Back' }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Go back to the previous page"
      className={`inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </button>
  )
}


