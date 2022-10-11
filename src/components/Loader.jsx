import loader from '../assets/loader.svg'

export default function Loader() {
    
    return (
        <div className="absolute flex items-center animate-spin m-auto right-[49.6%] top-[40%]">
            <img className='w-16' src={loader} alt="Loading..." />
        </div>
    )
}