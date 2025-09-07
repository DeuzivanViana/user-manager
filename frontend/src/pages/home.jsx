import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { validateToken } from '../models/validator'
import { Posts } from '../components/Posts'

export const Home = () => {
  const navigate = useNavigate()
  validateToken(navigate)

  return <Layout>
    <Posts/>
  </Layout>
}