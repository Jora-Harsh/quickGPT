import React from 'react'
import SideBar from './components/SideBar'
import ChatBox from './components/ChatBox'
import { Routes, Route } from 'react-router-dom'
import Credits from './pages/Credits'
import Community from './pages/Community'

const App = () => {
    return (
        <>
            <div className='dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000000] dark:text-white'>
                <div className='flex h-screen w-screen'>
                    <SideBar />
                    <Routes>
                        <Route path="/" element={<ChatBox />} />
                        <Route path='/credits' element={<Credits />} />
                        <Route path='/community' element={<Community />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default App
