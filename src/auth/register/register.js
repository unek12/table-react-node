import React, {useState} from "react"
import './index.scss'
import {Button, Input} from "antd";
import {Form} from "antd";
import Service from "../../service";

const Register = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const {register} = Service()

    const submitHandler = () => {
        setLoading(true)
        register(form).then(res => console.log(res)).catch(e => {
            document.querySelector('.error').innerHTML = e
            setTimeout(() => {
                if (document.querySelector('.error')) {
                    document.querySelector('.error').innerHTML = ''
                }
            }, 3000)
        }).finally(() => setLoading(false))
    }

    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

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
                    <div className='error'/>
                    <Button onClick={submitHandler} disabled={loading}>
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Register