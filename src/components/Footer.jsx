import React from 'react'

export default function Footer() {
  return (
    <footer className='relative p-4 bg-[#161616]'>
        <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        <div className="sm:col-span-2 lg:col-span-3 text-[#e11836] text-sm text-center p-4">&copy; {new Date().getFullYear()} Texcars. All rights reserved.</div>
    </footer>
  )
}
