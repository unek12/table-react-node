import React, {useEffect, useState, useCallback} from "react"
import {Button, Input} from "antd"
import {MainTable} from '../../components/table'
import { SearchOutlined } from '@ant-design/icons'
import {AddForm} from "../../components/addForm"
import {EditForm} from "../../components/editForm";
import './index.scss'
import Service from "../../service"

const MainPage = ({isAdmin, logout}) => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    const [editId, setEditId] = useState('')
    const [action, setAction] = useState('')
    const [renderForm, setRenderForm] = useState()
    const [loading, setLoading] = useState(true)

    const { getData, dataDelete } = Service()

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    const onSearch = useCallback(() => {
        if (search) {
            setNewData(newData.filter(item => item.name.match(search)))
        } else {
            setNewData(newData)
        }
    },[search])

    const deleteData = (e) => {
        const id = e.target.dataset.key || e.target.parentElement.dataset.key
        dataDelete(id)
            .then(() => data.splice(+id, 1))
            .then(() => setNewData(data.map((item, i) => ({...item, range: `${item.range1}-${item.range2}`, key: i}))))
    }

    const selectEditData = (e) => {
        const id = e.target.parentElement.dataset.key || e.target.dataset.key
        setEditId(id)
    }

    const editData = (id, form) => {
        data[id] = form
        setNewData(data.map((item, i) => ({...item, range: `${item.range1}-${item.range2}`, key: i})))
    }

    const addData = (form) => {
        data.push(form)
        setNewData(data.map((item, i) => ({...item, range: `${item.range1}-${item.range2}`, key: i})))
    }

    useEffect( ()=> {
        if (!search) {
            getData()
                .then(res => setData(res))
                .finally(() => setLoading(true))
            onSearch()
        }
    }, [search])

    useEffect(() => setNewData(data.map((item, i) => ({...item, range: `${item.range1}-${item.range2}`, key: i}))),
        [loading, data])

    useEffect(() => {
        if (action === 'add') {
            setRenderForm(<AddForm setAction={setAction} setEditData={addData} data={data}/>)
        }
        if (action === 'edit') {
            setRenderForm(<EditForm setAction={setAction} data={data} itemId={editId} setEditData={editData}/>)
        }
        if (!action) {
            setRenderForm('')
        }
    }, [action])

    return (
        <div className='container'>
            <header>
                <h1>
                    Sensor table
                </h1>
                <Button size='large'
                    onClick={logout}
                >
                    Logout
                </Button>
            </header>
            <section className='main'>
                <div className='main__panel'>
                    <div className="search-panel">
                        <Input onChange={searchHandler} value={search}/>
                        <Button onClick={onSearch}>
                            <SearchOutlined />
                            Search
                        </Button>
                    </div>
                    <Button
                        className='btn-add'
                        onClick={() => {
                            setAction('add')
                        }}
                        disabled={!isAdmin}
                    >
                        Add sensor
                    </Button>
                </div>
                <MainTable
                    renderData={newData}
                    data={data}
                    deleteData={deleteData}
                    search={search}
                    editData={selectEditData}
                    setAction={setAction}
                    isAdmin={isAdmin}
                />
            </section>
            {renderForm}
        </div>
    )
}

export default MainPage