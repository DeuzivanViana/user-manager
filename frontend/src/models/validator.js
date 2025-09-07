import { useEffect } from 'react'
import { apiwc } from '../service/api'

export const validateToken = (navigate) => {
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await apiwc.get('/auth/check-token')
          
      } catch (err) {
        navigate('/sign-in')
      }
    }
    verify()
  }, [navigate])
}