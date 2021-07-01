import React, {useEffect, useState} from "react"
import Service from "../../service";
import './index.scss'
import {Form, Input, Select, Button} from 'antd';
import TextArea from "antd/es/input/TextArea";

const AddForm = ({setAction, setEditData, data}) => {
    const [form , setForm] = useState({
        name: '',
        model: '',
        type: '',
        range1: '0',
        range2: '0',
        unit: '',
        location: '',
        description: ''
    })

    const {addData} = Service()

    const formHandler = (e) => {
        setForm({...form, [e.target.id]: e.target.value})
    }

    const submitHandler = () => {
        addData(form).then(() => setEditData(form))
        setAction('')
    }

    return (
    <div className='form-container'>
        <div className='form-content'>
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
                           max: 30
                       },
                    ]}
                >
                    <Input id='name' onChange={formHandler}/>
                </Form.Item>

                <Form.Item
                    label="Model"
                    name='model'
                    rules={[
                        {
                            required: true,
                            message: 'Please input model!',
                            max: 15
                        },
                    ]}
                >
                    <Input id='model' onChange={formHandler}/>
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
                >
                    <Select id='type' onChange={(value) => setForm({...form, type: value})}>
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
                >
                    <Select id='unit' onChange={(value) => setForm({...form, unit: value})}>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Location"
                    name='location'
                    rules={[{
                            message: 'Please input model!',
                            max: 15
                        }]}
                >
                    <Input id='location' onChange={formHandler}/>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name='description'
                    rules={[{
                        message: 'Please input no longer 200!',
                        max: 200
                    }]}
                >
                    <TextArea id='description' onChange={formHandler}/>
                </Form.Item>
                <div className="btns">
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                        onClick={submitHandler}
                    >
                        Save
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

export {AddForm}