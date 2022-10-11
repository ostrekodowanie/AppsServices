import { useState, useEffect } from "react"

export default function Products({ user, setUser }) {
    const [products, setProducts] = useState('')

    useEffect(() => {
        if(user) {
            fetch('https://services.divideproject.works/api/user/apps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id
                })
            }).then(res => res.json())
            .then(data => setProducts(data))
        }
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem('login')
        return setUser(null)
    }

    return (
        <section className='flex flex-col items-center relative justify-center h-screen px-[8vw] md:px-[12vw] 2xl:px-[18vw]'>
            <button className="absolute right-8 top-8 font-medium" onClick={handleLogout}>Log out</button>
            <div className='p-12 gap-6  w-full shadow-primaryShadow rounded-3xl'>
                <h1 className="font-semibold text-3xl">Hi <span className="text-primary">{user.username}</span></h1>
                {products.length > 0 ? products.map(product => <Product {...product} key={product.id} />) : <h2 className="mt-6 text-[#4A454F]">Nothing's here! Buy something from our <a className="text-primary" href='https://services.divideproject.works/products' target='_blank'>store.</a></h2>}
            </div>
        </section>
    )
}

const Product = props => {
    return (
        <div className="flex flex-col gap-2 pt-6">
            <img className="max-w-[3in] rounded-xl shadow-primaryShadow" src={`https://services.divideproject.works/images/${props.image}`} alt="" />
            <h3 className="text-lg font-medium">{props.name}</h3>
            <p className="text-[#4A454F]">{props.desc}</p>
        </div>
    )
}