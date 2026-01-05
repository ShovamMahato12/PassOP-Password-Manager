import React from 'react'
import { useRef, useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const ShowPassword = () => {
        // alert("Show The Password")
        passwordRef.current.type = "text"
        console.log(ref.current.src);
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }

    }

    const savePassword = () => {
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
        console.log(...passwordArray, form);
        setform({ site: "", username: "", password: "" });
        toast('Password saved!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id:", id);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        // console.log(...passwordArray, form);
    }

    const editPassword = (id) => {
        console.log("Editing password with id:", id);
        setform(passwordArray.filter(item => item.id === id)[0]);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
        // setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
        // console.log(...passwordArray, form);
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    return (


        <>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark "
            transition={Bounce}
        />

            {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div> */}
            <div className="p-2 md: p-0 md:mycontainer ">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-700">&lt;</span>
                    Pass<span className="text-green-700">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-xl text-center'>Manage your own password</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className="absolute right-0.75 top-1 cursor-pointer" onClick={ShowPassword}>
                                <img ref={ref} width={25} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex rounded-full justify-center items-center bg-green-400 hover:bg-green-300 px-8 py-2 w-fit gap-4  border-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            state="hover-swirl"
                        ></lord-icon>
                        Save Password</button>

                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords saved yet.</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>

                                    <td className=' py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank' >{item.site}</a>
                                            <div className='lordIconCopy size-7 cursor-pointer  ' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", " paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover"
                                                    state="hover-squeeze">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 text-center border border-white '>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='lordIconCopy size-7 cursor-pointer  ' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", " paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover"
                                                    state="hover-squeeze">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>


                                    <td className=' py-2 text-center border border-white '>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.password}</span>
                                            <div className='lordIconCopy size-7 cursor-pointer  ' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", " paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover"
                                                    state="hover-squeeze">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 text-center border border-white '>
                                        <span className='cursor-pointer mx-1'  onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                        <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}
export default Manager;