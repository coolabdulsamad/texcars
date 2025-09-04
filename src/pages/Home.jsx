import React, { useEffect, useState } from 'react'
import { ASSETS } from '../assets'
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HiArrowLongRight } from 'react-icons/hi2'
import { CgArrowLongRight, CgArrowLongRightR } from 'react-icons/cg'
import { MdOutlineMarkEmailUnread, MdOutlinePhone } from 'react-icons/md'
import toast from 'react-hot-toast'

export default function Home() {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      fullname, email, location
    }
    console.log({ data })
    toast.success("Your request has been submitted successfully. We will get back to you soon!", {
      duration: 5000
    })
    setFullname("")
    setEmail("")
    setLocation("")
  }

    const images = [
    ASSETS["giwagon_gray_car"],
    ASSETS["aeriel_blue_car"],
    ASSETS["mercedes_race_car"],
    ASSETS["sport_blue_car"],
    ASSETS["lamborghini_ash_car"],
    ASSETS["lamborghini_yellow_car"]
  ];

  const itemsPerSlide = 2;
  const totalSlides = Math.ceil(images.length / itemsPerSlide);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(autoSlide);
  }, [totalSlides]);

  return (
    <main className="relative">
      <section className="relative bg-gradient-to-tr from-[#161616] via-slate-600 to-[#161616] py-10 px-4 min-h-[80vh]">
        <img src={ASSETS['main_hero_car']} alt="" className="h-full w-full absolute object-contain object-center" />
        <div className="container mx-auto relative h-full">
          <div className="w-full max-w-lg p-4 md:p-20 flex flex-col gap-4 backdrop-blur-sm text-white">
            <h1 data-aos="fade-left" className="font-serif max-w-sm text-4xl md:text-6xl">We Deliver Luxury</h1>
            <p data-aos="fade-up" data-aos-delay="500" className="text-lg md:text-2xl leading-loose">If your idea of luxury is standing out among families and friends, you are just the perfect customer for our merchandise!</p>
          </div>
        </div>
      </section>
      <section className="relative">
        <div className="container mx-auto flex flex-col md:flex-row">
          <aside className="flex-1 relative px-4 py-10 md:px-10 md:py-20 bg-white text-primary">
            <p data-aos="fade-down" className="text-sm md:text-base w-max relative before:absolute before:h-0.5 before:w-12 before:bg-secondary before:left-[120%] before:top-1/2 before:-translate-y-1/2">About </p>
            <h3 data-aos="zoom-out" data-aos-delay="800" className="text-3xl md:text-5xl font-serif">TexCars Luxury</h3>
            <p data-aos="fade-up" data-aos-delay="1200" className="max-w-sm text-justify text-base md:text-lg opacity-70 py-4">From the fine hall of luxury and palace of opulence, we bring you the very best products, ranging from antiques to latest state-of-the-art cars that announces your status without uttering a word. </p>
          </aside>
          <aside className="flex-1 relative space-y-2 px-4 py-10 md:px-10 md:py-20 bg-primary text-white">
            <h3 data-aos="zoom-in-left" data-aos-delay="2000" className="text-3xl md:text-4xl font-sans max-w-sm mb-5">Any type of query &amp; discussion</h3>
            <p data-aos="fade-up" data-aos-delay="2250" className="flex items-center gap-2 opacity-70">
              <MdOutlinePhone className="flex-shrink-0" /> Call Us:  (+1) 8023910725.
            </p>
            <p data-aos="fade-up" data-aos-delay="2500" className="flex items-center gap-2 opacity-70">
              <MdOutlineMarkEmailUnread className="flex-shrink-0" /> Send Message: query@texcars.com
            </p>
            <p data-aos="fade-up" data-aos-delay="2750" className="flex items-center gap-2 opacity-70 pt-6">
              <FaMapMarkerAlt className="flex-shrink-0" /> Sirakoro Str., Wuse 2, Abuja, Nigeria.
            </p>
            <Link data-aos="fade-left" data-aos-delay="3000" to="/shop" className="relative h-8 w-8 before:absolute before:top-0 before:left-0 before:bg-white before:opacity-70 before:h-full before:w-full before:rounded-full block ml-auto">
              <HiArrowLongRight fontWeight={100} className="absolute z-10 right-5 top-1/2 -translate-y-1/2 font-extralight scale-x-[2] text-xl text-[#565656] opacity-70" />
            </Link>
          </aside>
        </div>
      </section>
<div className="relative max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg my-5">
  <div
    className="flex transition-transform duration-800 ease-in-out"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {Array.from({ length: totalSlides }).map((_, slideIndex) => {
      const start = slideIndex * itemsPerSlide;
      const end = start + itemsPerSlide;
      return (
        <div
          key={slideIndex}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full flex-shrink-0 p-2"
        >
          {images.slice(start, end).map((imgSrc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={imgSrc}
                alt={`Car ${idx}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      );
    })}
  </div>
  <button
    onClick={() =>
      setCurrentIndex(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1)
    }
    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full"
  >
    ◀
  </button>
  <button
    onClick={() =>
      setCurrentIndex(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1)
    }
    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full"
  >
    ▶
  </button>
</div>
      <section className="py-10 px-4">
        <div className="container mx-auto flex flex-col md:flex-row-reverse gap-8">
          <aside className="flex-1 py-6 sm:py-10 md:py-24 space-y-4">
            <p className="text-sm md:text-base w-max relative before:absolute before:h-0.5 before:w-12 before:bg-secondary before:left-[120%] before:top-1/2 before:-translate-y-1/2">Our Value </p>
            <h3 className="text-3xl md:text-4xl text-primary font-serif font-bold">We <span className="text-secondary">consider</span> you our first <span className="text-secondary">priority</span></h3>
            <p className="text-base md:text-lg opacity-70">We are committed to providing you with the best luxury products and services. Our team is dedicated to ensuring that your experience with us is nothing short of exceptional.</p>
          </aside>
          <aside className="flex-1 relative min-h-48 bg-primary">
            <img src={ASSETS['aeriel_blue_car']} alt="ariel_blue_car" className="absolute top-0 left-0 h-full w-full object-cover object-center" />
          </aside>
        </div>
      </section>
      <section className="relative w-full min-h-screen overflow-hidden">
        <img
          src={ASSETS['lamborghini_ash_car']}
          alt="lamborghini_ash_car"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-20 top-6 flex flex-col items-center justify-center text-center">
          <button className="relative group bg-[#1b1f24] text-white px-6 py-2 h-14 rounded-full shadow-lg flex items-center justify-center w-80 transition-all duration-300 hover:bg-white hover:text-red-600">
            <span className="transition-all duration-300 bg-red-600 w-10 h-10 flex items-center justify-center rounded-full text-xl absolute left-3 group-hover:bg-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white group-hover:text-red-600 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.27 1.06L9.12 9.88a16.018 16.018 0 006 6l1.54-1.54a1 1 0 011.06-.27l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z"
                />
              </svg>
            </span>
            <span className="mx-auto text-sm font-semibold tracking-wider transition-all duration-300">
              CALL US NOW
            </span>
          </button>
        </div>

        <div className="relative z-20 flex flex-col-reverse lg:flex-row justify-between items-center pt-32 px-4 lg:px-24 pb-16 text-white gap-10">
          {/* Left Panel (Contact Info) - Should be first on mobile */}
          <div className="w-full lg:w-1/2 bg-[#323435] text-white rounded-lg p-6 md:p-10 text-center space-y-4">
            <p className="text-sm uppercase tracking-widest text-gray-400">Emergency Line</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              Car Repair <span className="text-yellow-400">Services</span>
            </h2>
            <p className="text-sm text-gray-300">If you have questions feel free to call us</p>
            <div className="space-y-2">
              <p className="text-lg font-medium text-white">+61 414 698 265</p>
              <p className="text-lg font-medium text-white">+1 1454 654 3204</p>
            </div>
          </div>

          {/* Right Panel (Form) */}
          <form onSubmit={handleSubmit} className="w-full lg:w-300">
            <div className="bg-[#323435] bg-opacity-70 p-6 rounded-lg w-full">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={fullname}
                  onChange={e => setFullname(e.target.value)}
                  className="flex-1 p-3 rounded-full border-2 hover:border-secondary bg-white text-primary placeholder-gray-400 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 p-3 rounded-full border-2 hover:border-secondary bg-white text-primary placeholder-gray-400 focus:outline-none"
                />
              </div>
              <textarea
                placeholder="Your Current Location"
                rows={3}
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full p-3 mb-4 rounded-3xl border-2 hover:border-secondary bg-white text-primary placeholder-gray-400 focus:outline-none"
              />
              <button className="w-full bg-secondary hover:bg-white hover:text-secondary text-white font-semibold py-3 rounded-full cursor-pointer">
                Schedule your car checkup
              </button>
            </div>
          </form>
        </div>

      </section>
    </main>
  )
}