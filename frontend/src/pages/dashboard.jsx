import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { validateToken } from '../models/validator'
import { Posts } from '../components/Posts'
import { UserList } from '../components/UserList'

export const Dashboard = () => {
  const navigate = useNavigate()
  validateToken(navigate)

  return <Layout>
    <UserList/>
  </Layout>
}