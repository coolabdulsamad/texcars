import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { ASSETS } from '../assets'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(false)

  const images = Object.values(ASSETS)
  const API_URL = import.meta.env.VITE_BASE_URL
  // .filter(asset => asset.endsWith('.jpg') || asset.endsWith('.png'))

 const fetchCars = async () => {
    setLoading(true)
    toast.loading("Fetching cars, please wait", {id: "123"})
    try {
      const res = await fetch(API_URL) // Replace with your API endpoint
      const data = await res.json()
      setAllCars(data)
      console.log({ data })
      toast.dismiss("123")
      toast.success("Car fetched success, welcome", {id: "123"})
    } catch (error) {
      console.log('error', error)
      toast.error("An error occured while fetching the cars, please try agian later.", {id: "123"})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()

    return () => {
      setAllCars([])
      setLoading(false)
    }
  }, [])
  
  return (
    <main className='space-y-10'>
      <section className="relative px-4 h-[40vh] bg-primary">
        <img src={ASSETS['lamborghini_ash_car']} alt="lamborgini_ash_car" className="opacity-40 absolute top-0 left-0 h-full w-full object-cover object-center" />
      </section>
      <section className="py-10 px-4 space-y-10">
        <div className="container mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Explore Our Cars</h2>
          <p className="text-center text-lg md:text-xl opacity-70">Browse through our collection of luxury cars and find the perfect one for you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              loading ? (
                <div className="col-span-full text-center">Loading...</div>
              ) : allCars.length > 0 ? (
                allCars?.map((car, i) => {
                  const imageIndex = i % images.length
                  const updatedCar = { ...car, image: images[imageIndex] }
                  return <ProductCard key={car.id} {...updatedCar} />
                })
              ) : (
                <div className="col-span-full text-center">No cars available at the moment.</div>
              )
            }
          </div>
        </div>
      </section>
    </main>
  )
}