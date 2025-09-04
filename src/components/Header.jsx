import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineCar } from 'react-icons/ai'
import { PiShoppingCartLight } from 'react-icons/pi'
import { RiMenu3Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux'


export default function Header() {

    const location = useLocation();
    const [navOpen, setNavOpen] = useState(false);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        // This effect can be used to handle any side effects when the location changes
        // For example, you might want to scroll to the top of the page on navigation
        window.scrollTo(0, 0);

        // clean up function
        return ()  => {
            setNavOpen(false)
        }
    }, [location.pathname]);

    // console.log("Current Path:", location.pathname);

    const navLinks = [
        { id: "1230", name: 'Home', path: '/' },
        { id: "1231", name: 'About', path: '/about' },
        { id: "1232", name: 'Explore car', path: '/shop' },
        { id: "1233", name: 'Contact', path: '/contact' }

    ]

    return (
        <header className='bg-white md:p-4 md:rounded-full fixed top-0 md:top-4 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:container z-50 shadow-lg'>
            <div className="container mx auto relative flex justify-between gap-4 p-4 md:p-0">
                <Link to="/" className='flex items-center gap-2'>
                <div className="h-10 w-10 rounded-full grid place-items-center bg-primary flex-shrink-0">
                    <AiOutlineCar className='text-white text-2xl md:text-3xl flex-shrink-0' />
                </div>                    
                    <h1 className="text-lg md:text-xl font-bold text-[#e11836]">Texcars</h1>
                </Link>
                <nav className={`flex-1 bg-backdrop md:bg-white w-full absolute md:static top-full ${navOpen ? "left-0" : "left-full"} transition-all duration-300 flex flex-col md:flex-row justify-center md:gap-2`}>
                    {navLinks.map(link => (
                        link.path === "/contact" ? 
                        <a key={link.id} href={link.path} className='text-primary font-semibold hover:text-white hover:bg-[#e11836] px-4 py-2 md:rounded-md transition-colors duration-300'>
                            {link.name}
                        </a> 
                        :
                        <Link key={link.id} to={link.path} className='text-primary font-semibold hover:text-white hover:bg-[#e11836] px-4 py-2 md:rounded-md transition-colors duration-300'>
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex gap-2 w-max">
                    {/* <div className="relative p-2 text-base md:text-lg text-white"> */}
                        <Link to="/cart" className="relativ bg-secondary rounded-full h-10 w-10 grid place-items-center text-2xl md:text-3xl text-white">
                            <PiShoppingCartLight />
                            <span className="h-5 w-5 rounded-full bg-primary text-xs text-white grid place-items-center absolute -top-2 -right-2 border border-white">
                                {cart.length ?? 0}
                            </span>
                        </Link>
                    {/* </div> */}
                    <div onClick={() => setNavOpen(!navOpen)} className="relative md:hidden h-12 w-12 grid place-items-center text-2xl text-primary bg-backdrop hover:bg-primary hover:text-white rounded-full cursor-pointer">
                        <RiMenu3Fill />
                    </div>
                </div>
            </div>
        </header>
    )
}
