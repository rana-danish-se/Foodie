"use client"
import React, { useRef, useEffect } from 'react'

const VideoSection = () => {
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current

    if (!video || !container) return

    // Intersection Observer for play/pause
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play when in view
            video.currentTime = 0 // always restart from beginning
            video.play().catch((err) =>
              console.log('Play failed:', err)
            )
          } else {
            // Pause when out of view
            if (!video.paused) {
              video.pause()
            }
          }
        })
      },
      { threshold: 0.3 } // 30% visible triggers play/pause
    )

    observer.observe(container)

    // Reset on end
    const handleVideoEnd = () => {
      video.currentTime = 0
      video.play().catch((err) => console.log('Replay failed:', err))
    }

    video.addEventListener('ended', handleVideoEnd)

    return () => {
      observer.unobserve(container)
      video.removeEventListener('ended', handleVideoEnd)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-[90%]  max-w-7xl mx-auto py-20 flex items-center justify-center"
    >
      <video
        ref={videoRef}
        className="w-full h-[100vh] sm:w-[350px]  object-cover rounded-lg shadow-4xl "
        
        playsInline
        preload="metadata"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoSection
