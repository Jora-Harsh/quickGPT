import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChat, theme, setTheme, user, navigate } =
    useAppContext()

  const [search, setSearch] = useState('')

  return (
    <aside
      className={`
       flex flex-col
    h-dvh
    w-72 max-md:w-full
    p-4
    border-r border-[#80609F]/30
    backdrop-blur-3xl
    dark:bg-gradient-to-b
    dark:from-[#242124]/90
    dark:to-black
      `}
    >
      <div className="shrink-0">
        {/* Logo */}
        <img
          src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
          className="w-full max-w-44"
          alt="QuickGPT"
        />

        {/* New Chat */}
        <button className="w-full py-2 mt-4 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] rounded-md text-sm">
          + New Chat
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 p-2 mt-3 border border-gray-400 dark:border-white/20 rounded-md">
          <img src={assets.search_icon} className="w-4 not-dark:invert" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations"
            className="w-full text-xs bg-transparent outline-none text-black dark:text-white placeholder:text-gray-400"
          />
        </div>

        {/* Recent Chats */}
        {chats.length > 0 && (
          <p className="mt-3 text-sm font-medium">Recent Chats</p>
        )}
      </div>


      <div className="flex-1 min-h-0 overflow-y-auto mt-2 space-y-2">
        {chats
          .filter((chat) =>
            chat.messages[0]
              ? chat.messages[0].content
                .toLowerCase()
                .includes(search.toLowerCase())
              : chat.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((chat) => (
            <div
              onClick={() => {navigate('/'); setSelectedChat(chat); setIsMenuOpen(false);}}
              key={chat._id}
              className="
                p-2 px-3
                border border-gray-300
                dark:border-[#80609F]/15
                rounded-md
                cursor-pointer
                dark:bg-[#57317C]/10
              "
            >
              <p className="truncate text-sm">
                {chat.messages.length
                  ? chat.messages[0].content.slice(0, 32)
                  : chat.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">
                {moment(chat.updatedAt).fromNow()}
              </p>
            </div>
          ))}
      </div>


      <div className="shrink-0 space-y-2 pt-3">
        {/* Community */}
        <div
          onClick={() => {navigate('/community'); setIsMenuOpen(false);}}
          className="flex items-center gap-2 p-2 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer"
        >
          <img src={assets.gallery_icon} className="w-4 not-dark:invert" />
          <p className="text-sm">Community Images</p>
        </div>

        {/* Credits */}
        <div
          onClick={() => {navigate('/credits'); setIsMenuOpen(false);}}
          className="flex items-center gap-2 p-2 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer"
        >
          <img src={assets.diamond_icon} className="w-4 dark:invert" />
          <div className="text-sm">
            <p>Credits : {user?.credits}</p>
            <p className="text-xs text-gray-400">
              Purchase credits to use QuickGPT
            </p>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between gap-2 p-3 border border-gray-300 dark:border-white/15 rounded-md">
          <div className="flex gap-2 items-center text-sm">
            <img src={assets.theme_icon} className="w-4 not-dark:invert" />
            <p>Dark Mode</p>
          </div>
          <label className="relative inline-flex cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === 'dark'}
              onChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
            />
            <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
          </label>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 p-2 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
          <img src={assets.user_icon} className="w-6 rounded-full" />
          <p className="flex-1 dark:text-primary text-sm truncate">
            {user ? user.name : 'Login your account'}
          </p>
          {user && <img src={assets.logout_icon} className="h-5 cursor-pointer not-dark:invert hidden group-hover:block" />}
        </div>

        <img onClick={() => setIsMenuOpen(false)} src={assets.close_icon} className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert z-50' alt="" />

      </div>
    </aside >
  )
}

export default SideBar
