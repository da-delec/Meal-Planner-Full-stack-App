import React from 'react'
import { SessionProvider } from 'next-auth/react'

const layout = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default layout
