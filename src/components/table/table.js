import React, {useEffect, useState} from "react"
import {Button, Table} from 'antd';
import {columns} from './table.Columns'


const MainTable = ({renderData, deleteData, editData, setAction, isAdmin}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const actions = isAdmin ? (
        <>
            <Button onClick={(e) => {editData(e)
                    setAction('edit')}}>Edit</Button>
        <Button onClick={deleteData}>Delete</Button></>
    ) : ''

    useEffect(() => {
        if (columns.length < 7 && isAdmin) {
            columns.push({
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                width: '10rem',
            })
        }
    }, [isAdmin])

    useEffect(() => {
        if (renderData[0]) {
            document.querySelectorAll('tbody tr')
                .forEach(item => {
                const btns = item.querySelectorAll('button')
                    if (btns[0]){
                        btns[0].dataset.key = item.dataset.rowKey
                        btns[1].dataset.key = item.dataset.rowKey
                    }
            })
        }
    }, [renderData])

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys({ selectedRowKeys })
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return <Table columns={columns} dataSource={renderData.map(item =>  ({...item, actions: actions}))} selectedRowKeys={rowSelection}/>
}

export {MainTable}