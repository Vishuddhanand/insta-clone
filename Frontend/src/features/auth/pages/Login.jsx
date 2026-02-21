import React, { useState } from 'react'
import { Link } from 'react-router'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { handleLogin } = useAuth()

    function handleSubmit(e) {
        e.preventDefault()
        handleLogin(username, password)
    }


    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => setUsername(e.target.value)}
                        type="text"
                        name='username'
                        placeholder='Enter Username' />
                    <input
                        onInput={(e) => setPassword(e.target.value)}
                        type="password"
                        name='password'
                        placeholder='Enter Password' />
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
        </main>
    )
}

export default Login
