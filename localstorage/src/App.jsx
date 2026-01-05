import React from 'react'
import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import Manager from './Components/Manager.jsx'
import Footer from './Components/Footer.jsx'


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 relative z-0 bg-white
        bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),
        linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
        bg-size-[6rem_4rem]">

        <div className="absolute inset-0 z-[-1] pointer-events-none
          bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
        </div>

        <Manager />
      </main>

      <Footer />
    </div>
  )
}

export default App
