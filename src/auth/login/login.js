import React, {useEffect, useState} from "react"
import {Link} from 'react-router-dom'
import './index.scss'
import {Button, Input} from "antd";
import {Form} from "antd";
import Service from "../../service";

const Login = ({authLogin}) => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(0)

    const {login} = Service()

    const submitHandler = () => {
        setLoading(true)
        login(form).then(res => {
            if (res.message) {
                console.log(res.message)
                return authLogin(false)
            } else {
                localStorage.setItem('token', res.token)
                if (res.admin){
                    localStorage.setItem('admin', 'admin')
                }
                return authLogin(true)
            }
        }).catch((e) => console.log(e))
            .finally(() => setLoading(false))
    }

    const formHandler = (e) => setForm({...form, [e.target.name]: e.target.value})

    return (
        <div className='container'>
            <div className='auth-container'>
                <Form>
                    <Form.Item label='email'>
                        <Input name='email' id='email' size='middle' type='email' onChange={formHandler}/>
                    </Form.Item>
                    <Form.Item label='password'>
                        <Input name='password' id='password' size='middle' type='password' onChange={formHandler}/>
                    </Form.Item>
                    <Link to={'/register'}>register</Link>
                    <Button onClick={submitHandler} disabled={loading}>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login