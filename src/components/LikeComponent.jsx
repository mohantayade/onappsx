"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function LikeComponent({ id, onFetchChange }) {
  const [like, setLike] = useState(false)
  const [applikeornot, setApplike] = useState(false)


  const appLike = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(`/api/apps/details${id}/like`, {}, {
        params: {
          token: token
        }
      })
      setLike(!like)
      onFetchChange();
      return response.data.message;

    } catch (error) {
      console.log(error);
    }
  }

  const appUnlike = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.delete(`/api/apps/details${id}/unlike`, {
        params: {
          token: token
        }
      })
      setLike(!like)
      onFetchChange();
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  }

  const fetchApps = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await axios.get(`/api/apps/details${id}/likes`, {
          params: {
            token: token
          }
        });
        setApplike(response.data.message);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

  }


  const likefn = () => {
    const token = localStorage.getItem('token')
    if (token) {
      if (applikeornot) {
        appUnlike()
      } else {
        appLike()
      }

    } else {
      alert("Please LogIn")
    }

  }

  useEffect(() => {
    fetchApps()
  }, [likefn])

  


  return (
    <div>
      <button onClick={likefn} className=' px-5 py-2 rounded-xl font-semibold border-2 border-blue-500  text-2xl'>{applikeornot ? "❤️" : "🤍"}</button>
    </div>
  )
}

export default LikeComponent