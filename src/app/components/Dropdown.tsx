'use client'

import React, { useState } from 'react'

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center">
        {title}
        <span className="ml-1">&#9662;</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg">
          {items.map((item, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100">
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
