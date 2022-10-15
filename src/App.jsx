import Login from "./components/Login"
import { useState, useEffect } from 'react'
import Products from "./components/Products"

const loginFromLocalStorage = JSON.parse(localStorage.getItem('login'))

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log(window.location.pathname)
    if(loginFromLocalStorage) {
      setUser(loginFromLocalStorage)
    }
  }, [])

  return (
    <main>
      {user ? <Products user={user} setUser={setUser} /> : <Login setUser={setUser} />}
    </main>
  )
}

export default App
