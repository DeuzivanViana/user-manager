import { Layout } from '../components/Layout'
import { auth } from '../services/auth'
import { LoadingSpin } from '../components/LoadingSpin'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const { isPending, data } = auth.useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if(!isPending && !data?.user) navigate('/sign-in')
  }, [isPending, data])

  if(isPending) return <LoadingSpin/>

  return <Layout>
    <h1>Home</h1>
  </Layout>
}