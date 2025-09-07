import { useEffect, useState } from 'react'
import { apiwc } from '../service/api'

export const Posts = () => {
  const [posts, setPosts] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await apiwc.get('/post')
      if(res.data) {
        setIsLoading(false)
        setPosts(res.data)
      }
    }
    fetchPosts()
  }, [])

  return <ul>
      {
        !isLoading && posts ?
          posts.map((post, index) => {
            return <li key={index}>
              <article className='p-8 bg-neutral-900 text-neutral-50'>
                <h1 className='text-2xl font-bold'>{ post.title }</h1>
                <pre className='text-neutral-400 max-w-[100%] whitespace-pre-wrap'>{ post.content }</pre>
                <footer className='text-emerald-500 text-right mt-2'>@{ post.username }</footer>
              </article>
            </li>
          })
        : <></>
      }
  </ul>
}