import { useState, useEffect } from "react"
import Header from "./Header"
import Loader from "./Loader"

export default function Products({ user, setUser }) {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState(null)
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

    

    return (
        <>
            <Header user={user} setUser={setUser} />
            <section className='flex flex-col pt-[1.4in] md:pt-[1.8in] bg-[#FCFBFD] relative h-screen px-[8vw] md:px-[12vw] 2xl:px-[18vw]'>
                <div className="flex flex-col md:grid grid-cols-dashboard">
                    <Filter setFilter={setFilter} />
                    <div className='pl-16 gap-6 min-h-[4in] w-full'>
                        {products.length > 0 ? products.filter(product => filter ? product.category === filter : product).map(product => <Product {...product} key={product.id} />) : <Loader />}
                        {alert && products.length === 0 && <p className="font-medium">Seems like you haven't bought anything yet. <a className="text-primary" href="https://services.divideproject.works/products">Discover our products.</a></p>}
                    </div>
                </div>
            </section>
        </>
    )
}

const Product = props => {
    return (
        <a href={props.link} className="flex flex-col gap-2">
            <img className="max-w-[3in] rounded-xl shadow-primaryShadow" src={`https://services.divideproject.works/images/${props.image}`} alt="" />
            <h4 className="text-primary mt-2 font-medium text-sm">{props.category.charAt(0).toUpperCase() + props.category.slice(1)}</h4>
            <h3 className="text-lg font-medium">{props.name}</h3>
            <button className="rounded-3xl mt-2 bg-primary font-medium py-2 px-5 text-white w-max text-sm hover:scale-105 transition-transform">Open</button>
        </a>
    )
}

const filters = ['apps', 'templates']

const Filter = ({ setFilter }) => {
    const [active, setActive] = useState(null)
    
    useEffect(() => {
        setFilter(active)
    }, [active])

    return (
        <div className="flex flex-col gap-4">
            <h3 className="px-6 font-medium text-[#77638F]">Filter</h3>
            <ul className="flex flex-col gap-1">
                <li onClick={() => setActive(null)} className={`transition-colors rounded-xl flex items-center justify-between cursor-pointer font-medium px-6 py-3 ${!active ? 'bg-[#E9DDF8] text-primary' : 'hover:bg-[#E9DDF8] hover:text-primary'}`}>All{!active && <div className="h-2 w-2 rounded-full bg-[#852FF2]" />}</li>
                {filters.map(filt => <li onClick={() => setActive(filt)} className={`transition-colors rounded-xl flex items-center justify-between cursor-pointer font-medium px-6 py-3 ${active === filt ? 'bg-[#E9DDF8] text-primary' : 'hover:bg-[#E9DDF8] hover:text-primary'}`}>{filt.charAt(0).toUpperCase() + filt.slice(1)}{active === filt && <div className="h-2 w-2 rounded-full bg-[#852FF2]" />}</li>)}
            </ul>
        </div>
    )
}