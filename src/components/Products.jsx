import { useState, useEffect } from "react"
import Loader from "./Loader"

export default function Products({ user, setUser }) {
    const [products, setProducts] = useState([])
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        if(user) {
            fetch('https://services.divideproject.works/api/user/apps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user.id
            }).then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => setAlert(true))
        }
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem('login')
        return setUser(null)
    }

    return (
        <section className='flex flex-col items-center relative justify-center h-screen px-[8vw] md:px-[12vw] 2xl:px-[18vw]'>
            <button className="absolute right-8 top-8 font-medium" onClick={handleLogout}>Log out</button>
            <div className='p-12 gap-6 min-h-[4in] w-full shadow-primaryShadow rounded-3xl'>
                <h1 className="font-semibold text-3xl">Hi <span className="text-primary">{user.username}</span></h1>
                {products.length > 0 ? products.map(product => <Product {...product} key={product.id} />) : <Loader />}
                {alert && <p className="font-medium">Seems like you haven't bought anything yet. <a className="text-primary" href="https://services.divideproject.works/products">Discover our products.</a></p>}
            </div>
        </section>
    )
}

const Product = props => {
    return (
        <a href={props.link} className="flex flex-col gap-2 pt-6">
            <img className="max-w-[3in] rounded-xl shadow-primaryShadow" src={`https://services.divideproject.works/images/${props.image}`} alt="" />
            <h3 className="text-lg font-medium">{props.name}</h3>
            <p className="text-[#4A454F]">{props.desc}</p>
        </a>
    )
}