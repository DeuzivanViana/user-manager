import { useEffect, useState } from 'react'
import { apiwc } from '../service/api'
import { Edit, Eye, Trash, User } from 'lucide-react'

export const UserList = () => {
  const [users, setUsers] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await apiwc.get('/user')
      if(res.data) {
        setIsLoading(false)
        setUsers(res.data)
      }
    }
    fetchPosts()
  }, [])

  return <div className='m-4 shadow-md shadow-neutral-400 rounded-xl p-6'>
    <h1 className='text-2xl pb-4'>Clients</h1>
    <ul className='flex flex-col gap-4'>
      {
        !isLoading && users ?
          users.map((user, index) => {
            return <li key={index} className='grid grid-cols-12 gap-4 items-center'>
              <div className='flex col-span-5 items-center gap-4'>
                <User size={36} className='text-neutral-700'/>
                <div>
                  <h1>{ user.display_name }</h1>
                  <footer className='text-neutral-500'>{ user.email }</footer>
                </div>
              </div>
              <div className='col-span-7 flex gap-2 justify-end'>
                <Eye size={24} className='text-blue-500'/>
                <Edit size={24} className='text-green-500'/>
                <Trash size={24} className='text-red-500'/>
              </div>
            </li>
          })
          : <></>
        }
      </ul>
    </div>
}