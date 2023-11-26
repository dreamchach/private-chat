import Link from 'next/link'
import React from 'react'

const Layout = () => {
  return (
    <div>
        <Link href='/friends'>friends</Link>
        <Link href='/rooms'>rooms</Link>
    </div>
  )
}

export default Layout