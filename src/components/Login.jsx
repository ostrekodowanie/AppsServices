import { useState } from "react"
import logo from '../assets/logo.svg'
import jwtDecode from 'jwt-decode'
import Loader from "./Loader"

export default function Login({ setUser }) {
    const [status, setStatus] = useState('')
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    
    const handleSubmit = async e => {
        e.preventDefault()
        setStatus('loading')
        try {
            await fetch('https://services.divideproject.works/api/login', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(credentials)
            }).then(res => res.json())
            .then(data => jwtDecode(data.access))
            .then(user => {
                let userData = {
                    id: user.user_id,
                    username: user.username
                }
                setUser(userData)
                localStorage.setItem('login', JSON.stringify(userData))
            })
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen flex-col sm:flex-row gap-28">
            {status === 'loading' && <Loader />}
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <h1 className="text-4xl font-bold">Log in</h1>
                <input className="py-2 px-5 shadow-xl rounded-2xl" type="email" onChange={e => setCredentials(prev => {
                    return {
                        ...prev,
                        email: e.target.value
                    }
                })} placeholder="Email" />
                <input className="py-2 px-5 shadow-xl rounded-2xl" type="password" onChange={e => setCredentials(prev => {
                    return {
                        ...prev,
                        password: e.target.value
                    }
                })} placeholder="Password" />
                <button className="py-2 px-5 w-max rounded-xl font-medium bg-[#852FF2] text-white">Log in</button>
                <a className="text-[#852FF2] font-semibold" href="https://services.divideproject.works/products/4">Gain access</a>
            </form>
            <img className="max-w-[3in]" src={logo} alt="" />
        </div>
    )
}