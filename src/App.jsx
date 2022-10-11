import Login from "./components/Login"
import { useState } from 'react'
import Products from "./components/Products"

function App() {
  const [user, setUser] = useState(null)

  return (
    <main>
      {user ? <Products user={user} /> : <Login setUser={setUser} />}
    </main>
  )
}

export default App
