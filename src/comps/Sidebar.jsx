import React from 'react'
import { FaHome, FaHeart, FaClock, FaTrash } from "react-icons/fa";
import { MdCollections } from "react-icons/md";
import { IoClose } from "react-icons/io5";


const Sidebar = () => {

  const menuItems = [
    { icon: <FaHome />, label: "All snippets" },
    { icon: <MdCollections />, label: "Collections" },
    { icon: <FaHeart />, label: "Favourites" },
    { icon: <FaClock />, label: "Recent" },
    { icon: <FaTrash />, label: "Trash" },
  ]

  return (
    <div>

      <aside className='fixed top-0 left-0 h-screen w-65 bg-black z-50'>
        <div className='flex items-center justify-between p-5 border-b text-zinc-200'>
          <div>
            <h2 className='flex gap-2 items-center mb-3'><img src="./favicon.jpeg"
              className='w-7' alt="" /><span className='text-xl font-bold'>CopyIt</span></h2>
            <p className='text-zinc-400'>Organise your snippets</p>
          </div>

          <button className='text-xl hover:text-red-500 cursor-pointer'>
            <IoClose />
          </button>
        </div>


        <div className='p-4 space-y-2'>
          {menuItems.map((item) => (
            <button key={item.label}
              className='w-full flex items-center gap-3 px-4 py-3 text-gray-100 hover:bg-purple-500 rounded-lg transition-all duration-400 cursor-pointer'>
              <span className='text-xl'>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>


      </aside>
    </div>
  )
}

export default Sidebar