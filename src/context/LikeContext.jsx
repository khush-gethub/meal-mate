import { createContext, useContext, useState, useEffect } from 'react'

const LikeContext = createContext()

export const useLikeContext = () => {
  const context = useContext(LikeContext)
  if (!context) {
    throw new Error('useLikeContext must be used within a LikeProvider')
  }
  return context
}

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('likes')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes))
  }, [likes])

  const addLike = (id) => {
    setLikes((prevLikes) => {
      if (!prevLikes.includes(id)) {
        return [...prevLikes, id]
      }
      return prevLikes
    })
  }

  const removeLike = (id) => {
    setLikes((prevLikes) => prevLikes.filter((likeId) => likeId !== id))
  }

  return (
    <LikeContext.Provider value={{ likedCards: likes, addLike, removeLike }}>
      {children}
    </LikeContext.Provider>
  )
}

export default LikeContext