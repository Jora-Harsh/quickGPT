import React, { useState } from 'react'
import SideBar from './components/Sidebar'
import ChatBox from './components/ChatBox'
import { Routes, Route } from 'react-router-dom'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { assets } from './assets/assets'
import './assets/prism.css'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      {/* Mobile menu button */}
      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden fixed top-3 left-3 z-40"
        >
          <img src={assets.menu_icon} className="w-6 not-dark:invert" />
        </button>
      )}

      <div className="flex h-dvh overflow-hidden relative">
        {/* DESKTOP SIDEBAR  */}
        <div className="hidden md:block">
          <SideBar
            isMenuOpen={true}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        {/* MOBILE SIDEBAR  */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <SideBar
              isMenuOpen={true}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        )}

        {/* MAIN CONTENT */}
        <div className="flex-1 h-dvh overflow-hidden">
          <Routes>
            <Route path="/" element={<ChatBox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
