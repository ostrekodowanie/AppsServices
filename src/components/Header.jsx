import { useState } from 'react'
import logo from '../assets/logo.svg'
import arrowLeft from '../assets/arrow_left.svg'

export default function Header({ user, setUser }) {
    return (
        <header className="h-[6rem] bg-white fixed left-0 right-0 top-0 z-10 flex items-center justify-between shadow-[0px_3px_51px_rgba(133,47,242,0.05)] px-[8vw] md:px-[12vw] 2xl:px-[18vw]">
            <div className="flex gap-4 items-center">
                <img className='max-w-[3rem]' src={logo} alt="" />
                <div className='flex flex-col font-medium'>
                    <h2 className='text-sm'>Apps</h2>
                    <h2>Dashboard</h2>
                </div>
            </div>
            <ProfileMenu user={user} setUser={setUser} />
        </header>
    )
}

const ProfileMenu = ({ user, setUser }) => {
    const [active, setActive] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('login')
        return setUser(null)
    }

    return (
        <div className="relative flex flex-col items-center">
            <span onClick={() => setActive(prev => !prev)} className="font-semibold cursor-pointer flex items-center gap-2">{user.username} <img className={`rotate-180 transition-transform ${active ? '-rotate-90' : ''}`} src={arrowLeft} alt="" /></span>
            {active && <div className="profile-menu w-max min-w-[8rem] flex flex-col shadow-primaryShadow bg-white font-medium rounded-xl overflow-hidden absolute top-[150%] text-sm">
                <a className="py-4 px-6 transition-colors hover:text-primary border-b-[1px] border-[#E6E6E6]" target='_blank' href='https://services.divideproject.works/products'>Visit Shop</a>
                <a className="py-4 px-6 transition-colors hover:text-primary border-b-[1px] border-[#E6E6E6]" target='_blank' href='https://services.divideproject.works/support'>Get Help</a>
                <button onClick={handleLogout} className="text-red-400 cursor-pointer text-left py-4 px-6">Log out</button>
            </div>}
        </div>
    )
}