import React from 'react'
import { FaDiscord } from "react-icons/fa";
import { PiBookLight } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

export default function SideBar() {

  const dispatch = useDispatch();

  const sidebarLinks = [
    { icon: <FaDiscord />, title: 'Home' },
    { icon: <PiBookLight />, title: 'Book' },
  ]

  return (
    <div className="flex">

      <div className="fixed top-0 buttomn-0 left-0 z-40 h-screen w-16  m-0 flex flex-col bg-primary text-white shadow-lg py-10">
        {
          sidebarLinks.map(link => (
            <button key={link.title} className="relative p-4 rounded-md cursor-pointer bg-primary hover:bg-secondary gird place-items-center text-2xl group">
              <span className='absolute -right-full top-1/2 -translate-y-1/2 bg-primary text-white text-xs py-1 px-3 scale-y-0 group-hover:scale-y-100 transition-all duration-300'>{link.title}</span>
              <SideBarIcon icon={link.icon} />
            </button>
          ))
        }
      </div>
      <div className="flex-1 p-4 pl-20">
        <button onClick={() => dispatch({type: "site/logout"})} type="submit" className="py-2 px-6 md:px-10 rounded-md cursor-pointer bg-primary text-backdrop w-max">Logout</button>
      </div>
    </div>
  )
}

const SideBarIcon = ({ icon }) => (
  <div className="sidebar-icon">
    {icon}
  </div>
)
