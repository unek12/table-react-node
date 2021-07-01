import React, {useEffect, useState} from "react"
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import MainPage from "../page/mainPage";
import Login from "../auth/login";
import Register from "../auth/register/register";

const AppRouter = () => {
    const [auth, setAuth] = useState(false)
    const [admin, setAdmin] = useState(false)

    const login = (isAuth) => {
        setAuth(isAuth)
        if (localStorage.getItem('admin')) {
            setAdmin(true)
        }
    }

    const logout = () => {
        localStorage.removeItem('admin')
        localStorage.removeItem('token')
        setAuth(false)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuth(true)
        }
        if (!!localStorage.getItem('admin')) {
            setAdmin(true)
        }}, [localStorage.getItem('token')])

    if (auth){
        return (
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <MainPage isAdmin={admin} logout={logout}/>
                    </Route>
                    <Route path='*'>
                        <Redirect to='/'/>
                    </Route>
                </Switch>
            </Router>
        )
    }
    return (
        <Router>
            <Switch>
                <Route path='/login' exact>
                    <Login authLogin={login}/>
                </Route>
                <Route path='/register' exact>
                    <Register authLogin={login}/>
                </Route>
                <Route path='*'>
                    <Redirect to='/login'/>
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter