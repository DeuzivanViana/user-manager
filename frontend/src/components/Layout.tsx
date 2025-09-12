import React from 'react'

type Props = {
  children?: React.ReactNode
}

export const Layout = (props: Props) => {
  return <div>
    <main>
      { props.children }
    </main>
  </div>
} 