import React, { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function AosProvider({children}) {

    useEffect(() => {
      Aos.init({
        delay: 500,
        duration: 1000,
        once: true
      })
    }, [])

  return (
    <>{children}</>
  )
}
