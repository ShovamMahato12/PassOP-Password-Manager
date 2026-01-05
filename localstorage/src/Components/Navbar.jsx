import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 px-5 text-white '>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">


            <div className="logo font-bold text-white text-2xl">
                <span className="text-green-700">&lt;</span>
                Pass<span className="text-green-700">OP&gt;</span>

            </div>
            <ul>   
                <li className='flex gap-14'>
                    <a className='hover:font-bold' href="">Home</a>
                    <a className='hover:font-bold' href="">About</a>
                    <a className='hover:font-bold' href="">Contact</a>
                </li>
            </ul>
                <button className='flex justify-center text-center items-center gap-0 overflow-hidden'>
                    <img className='invert p-2 w-10' src="/icons/github.png" alt="" /><span className='font-bold '>Github</span>
                </button>
            </div>
        </nav>

    )
}

export default Navbar
