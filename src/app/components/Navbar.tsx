'use client'

import Link from 'next/link'
import { useState } from 'react'
import Dropdown from './Dropdown'

const Navbar = () => {
  const [showShowsDropdown, setShowShowsDropdown] = useState(false)
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false)
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false)

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="relative">
            <button onClick={() => setShowShowsDropdown(!showShowsDropdown)}>
              Shows
            </button>
            {showShowsDropdown && (
              <Dropdown items={['Show 1', 'Show 2', 'Show 3']} />
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
            >
              Projects
            </button>
            {showProjectsDropdown && (
              <Dropdown items={['Project 1', 'Project 2', 'Project 3']} />
            )}
          </div>
          <Link href="/team-members">Team Members</Link>
          <div className="relative">
            <button
              onClick={() => setShowCommunityDropdown(!showCommunityDropdown)}
            >
              Community
            </button>
            {showCommunityDropdown && (
              <Dropdown items={['Post 1', 'Post 2', 'Post 3']} />
            )}
          </div>
          <Link href="/about">About</Link>
          <Link href="/links">Links</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
