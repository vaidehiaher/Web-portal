import { useState } from 'react'
import { getCompanyLogo } from '../../lib/companyLogos'

interface CompanyLogoProps {
  companyName: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showFallback?: boolean
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8', 
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}

const sizePixels = {
  sm: '24',
  md: '32',
  lg: '48', 
  xl: '64'
}

export function CompanyLogo({ 
  companyName, 
  size = 'md', 
  className = '',
  showFallback = true 
}: CompanyLogoProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  
  const logoUrl = getCompanyLogo(companyName)
  const sizeClass = sizeClasses[size]
  const pixelSize = sizePixels[size]
  
  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }
  
  const handleImageLoad = () => {
    setImageLoading(false)
  }
  
  // If image failed to load and we should show fallback
  if (imageError && showFallback) {
    const initial = companyName.charAt(0).toUpperCase()
    
    return (
      <div className={${sizeClass} ${className} flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600}>
        <span className="text-white font-bold text-sm">
          {initial}
        </span>
      </div>
    )
  }
  
  return (
    <div className={${sizeClass} ${className} flex items-center justify-center relative}>
      {imageLoading && (
        <div className={${sizeClass} bg-gray-200 dark:bg-gray-700 rounded animate-pulse} />
      )}
      <img
        src={logoUrl}
        alt={${companyName} logo}
        className={`${sizeClass} object-contain rounded transition-opacity duration-200 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ 
          maxWidth: ${pixelSize}px,
          maxHeight: ${pixelSize}px
        }}
      />
    </div>
  )
}