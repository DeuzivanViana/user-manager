import { useEffect, useState } from 'react'
import { apiwc } from '../service/api'

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

  return <ul>
      {
        !isLoading && users ?
          users.map((user, index) => {
            return <li key={index} className='bg-neutral-900 text-neutral-50 flex gap-4 items-center p-6'>
              <div className='bg-neutral-300 w-[32px] h-[32px] rounded-full'></div>
              <div>
                <h1>{ user.display_name }</h1>
                <footer className='text-neutral-300'>{ user.email }</footer>
              </div>
            </li>
          })
        : <></>
      }
  </ul>
}