import Link from 'next/link'
import React from 'react'

const Page1Layout = () => {
  return (
    <div className='h-20 w-auto p-2 text-2xl bg-green-400 m-2 gap-4 shadow-lg shadow-zinc-600 flex flex-row'>
      <span>Links :</span>
      <Link href='/page1'>Page 1</Link>
      <Link href='/'>Home</Link>
      <Link href='/page1/inside'>Inside</Link>
      <Link href='/page1/inside/inner'>Page 1</Link>
    </div>
  )
}

export default Page1Layout
