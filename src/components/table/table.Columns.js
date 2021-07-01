import React from "react";

export const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span className='table-name'>{text}</span>,
    },
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Range',
        key: 'range',
        dataIndex: 'range',
        // render: tags => (
        //     <>
        //         {tags.map((tag, i) => <Tag key={i}>{tag.toUpperCase()}</Tag>)}
        //     </>
        // ),
    },
    {
        title: 'Unit',
        dataIndex: 'unit',
        key: 'unit',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    }
]