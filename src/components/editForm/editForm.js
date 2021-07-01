import React, {useEffect, useState} from "react"
import Service from "../../service";
import './index.scss'
import {Form, Input, Select, Button} from 'antd';
import TextArea from "antd/es/input/TextArea";

const EditForm = ({itemId, setAction, data, setEditData}) => {
    const [form , setForm] = useState({})

    const {dataEdit} = Service()

    const formHandler = (e) => {
        setForm({...form, [e.target.id]: e.target.value})
    }

    const submitHandler = () => {
        dataEdit(itemId, form).then(() => setEditData(itemId, form)).finally(() => setAction(''))
    }

    useEffect(() => {
        setForm({...data[itemId]})
    }, [])


    return (
        <div className='form-edit-container'>
            <div className='form-edit-content'>
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    layout="horizontal"
                >
                    <Form.Item
                        label="Name"
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                                min: 1,
                                max: 30
                            },
                        ]}
                        valuePropName={form.name}
                    >
                        <Input onChange={formHandler} value={form.name}/>
                    </Form.Item>

                    <Form.Item
                        label="Model"
                        name='model'
                        rules={[
                            {
                                required: true,
                                message: 'Please input model!',
                                min: 1
                            },
                        ]}
                        valuePropName={form.model}
                    >
                        <Input id='model' onChange={formHandler} value={form.model} maxLength={30}/>
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name='type'
                        rules={[
                            {
                                required: true,
                                message: 'Please input type!',
                            },
                        ]}
                        valuePropName={form.type}
                    >
                        <Select id='type' onChange={(value) => setForm({...form, type: value})} value={form.type} allowClear>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Range"
                        name='range'
                    >
                        <div className='range'>
                            <span>from:</span>
                            <Input type='number' id='range1' value={form.range1} onChange={formHandler}/>
                            <span>to:</span>
                            <Input type='number' id='range2' value={form.range2} onChange={formHandler}/>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Unit"
                        name='unit'
                        rules={[
                            {
                                required: true,
                                message: 'Please input name!',
                            },
                        ]}
                        valuePropName={form.unit}
                    >
                        <Select id='unit' onChange={(value) => setForm({...form, unit: value})} value={form.unit} allowClear>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Location"
                        name='location'
                        rules={[{
                            message: 'Please input model!',
                        }]}
                        valuePropName={form.location}
                    >
                        <Input id='location' onChange={formHandler} value={form.location}/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name='description'
                        rules={[{
                            message: 'Please input no longer 200!',
                            max: 200
                        }]}
                        valuePropName={form.description}
                    >
                        <TextArea id='description' onChange={formHandler} value={form.description}/>
                    </Form.Item>
                    <div className="btns">
                        <Button
                            type='primary'
                            htmlType='submit'
                            size='large'
                            onClick={submitHandler}
                        >
                            Edit
                        </Button>
                        <Button
                            size='large'
                            onClick={() => {
                                setAction('')
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
};

export {EditForm}