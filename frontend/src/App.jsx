import { useState } from 'react'
import Login from './components/Login'
import Chat from './components/Chat'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    const handleLoginSuccess = (userData) => {
        setUser(userData)
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        setUser(null)
    }

    return (
        <div className="main-wrapper">
            {!isLoggedIn ? (
                <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
                <Chat user={user} onLogout={handleLogout} />
            )}
        </div>
    )
}

export default App
