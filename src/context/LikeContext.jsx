import { createContext, useContext, useState, useCallback, useEffect } from 'react'

// This context is used to manage the likes in the application
const LikeContext = createContext()

// Custom hook to use the LikeContext
export const useLikeContext = () => {
  try {
    return useContext(LikeContext)
  } catch (error) {
    console.error('Error using LikeContext:', error)
    return null
  }
}

// Local storage helper for setting likes array
const setLocalStorage = (likesArray) => {
  try {
    localStorage.setItem('likes', JSON.stringify(likesArray))
  } catch (error) {
    console.error('Error setting local storage:', error)
  }
}

// Provider component
export const LikeProvider = ({ children }) => {
  // State to hold the likes
  const [likes, setLikes] = useState([])

  // Function to load likes from local storage
  const loadLikes = useCallback(() => {
    try {
      const storedLikes = JSON.parse(localStorage.getItem('likes')) || []
      setLikes(storedLikes)
    } catch (error) {
      console.error('Error loading likes from local storage:', error)
    }
  }, [])

  // Load likes from local storage when the component mounts
  useEffect(() => {
    loadLikes()
  }, [loadLikes])

  // Update local storage whenever likes change
  useEffect(() => {
    setLocalStorage(likes)
  }, [likes])

  const addLike = (like) => {
    setLikes((prevLikes) => [...prevLikes, like])
  }

  const removeLike = (likeId) => {
    setLikes((prevLikes) => prevLikes.filter((like) => like.id !== likeId))
  }

  const likeData = {
    likes,
    addLike,
    removeLike,
  }

  return (
    <LikeContext.Provider value={likeData}>
      {children}
    </LikeContext.Provider>
  )
}
