import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function About() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
        setLoading(true)
        toast.loading("Fetching records, please wait", {id: "123"})
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=3');
        if (!response.ok) throw new Error('Failed to fetch featured cars');
        const data = await response.json();
        
        const cars = data.map(item => ({
          id: item.id,
          model: item.title.split(' ')[0] + ' ' + Math.floor(Math.random() * (2023 - 2015 + 1) + 2015),
          price: `$${(item.price * 1000).toLocaleString()}`,
          image: item.image,
          category: ['Sedan', 'SUV', 'Truck'][Math.floor(Math.random() * 3)],
          rating: item.rating.rate,
          description: `Premium ${item.title.toLowerCase()} with excellent mileage and modern features.`
        }));
        
        setFeaturedCars(cars);
        toast.dismiss("123")
        toast.success("About fetched success, welcome", {id: "123"})
      } catch (err) {
        setError(err.message);
        toast.error("An error occured while fetching the records, please try agian later.", {id: "123"})
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <div className="bg-[#f7f2f4] min-h-screen">
      <div className="relative bg-[#161616]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="Luxury cars"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About TexCars
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Your premier destination for luxury car rentals and purchases in Texas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-[#161616] sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Founded in 2010, TexCars began as a small family-owned business in Austin with just 5 vehicles. 
              Today, we operate across Texas with a fleet of over 500 luxury and premium vehicles.
            </p>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#e11836] hover:bg-[#c1162f]"
                >
                  Visit our showroom
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <img
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="TexCars showroom"
            />
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-extrabold text-[#161616] sm:text-4xl">
            Featured Vehicles
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Browse some of our most popular models available for rent or purchase.
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e11836]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">Error loading featured cars: {error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredCars.map((car) => (
                <div key={car.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-center">
                      <img
                        className="h-48 w-full object-contain"
                        src={car.image}
                        alt={car.model}
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-[#161616]">{car.model}</h3>
                      <div className="mt-2 flex items-center">
                        {[0, 1, 2, 3, 4].map((star) => (
                          <svg
                            key={star}
                            className={`h-5 w-5 ${star < Math.floor(car.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{car.rating} stars</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{car.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-bold text-[#161616]">{car.price}</span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#f7f2f4] text-[#e11836]">
                          {car.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f7f2f4] px-4 py-4 sm:px-6 flex justify-between">
                    <button className="text-sm font-medium text-[#e11836] hover:text-[#c1162f]">
                      Rent now
                    </button>
                    <button className="text-sm font-medium text-[#161616] hover:text-gray-700">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-24 bg-[#161616] rounded-lg shadow-xl overflow-hidden">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Trusted by Texans for over a decade
              </h2>
              <p className="mt-3 text-xl text-gray-300">
                Our numbers speak for themselves
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Vehicles in fleet', value: '500+' },
                { label: 'Satisfied customers', value: '10,000+' },
                { label: 'Cities served', value: '25+' },
                { label: 'Average rating', value: '4.9/5' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-extrabold text-white sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-base font-medium text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-extrabold text-[#161616] sm:text-4xl">
            What Our Customers Say
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Michael R.",
                role: "Business Owner",
                quote: "TexCars has been my go-to for luxury rentals. Their service is impeccable and their fleet is always top-notch.",
                rating: 5
              },
              {
                name: "Sarah L.",
                role: "Frequent Traveler",
                quote: "I've rented from TexCars multiple times and they never disappoint. The booking process is seamless.",
                rating: 5
              },
              {
                name: "James T.",
                role: "Car Enthusiast",
                quote: "Found my dream car through TexCars' sales division. The team was knowledgeable and made the process easy.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-[#e11836]' : 'text-gray-300'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4">
                  <p className="text-lg text-gray-600">"{testimonial.quote}"</p>
                </blockquote>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0 bg-[#f7f2f4] rounded-full p-2">
                    <svg className="h-8 w-8 text-[#e11836]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-[#161616]">{testimonial.name}</div>
                    <div className="text-base text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}