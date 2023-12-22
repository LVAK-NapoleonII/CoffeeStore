import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd'
import {PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'

const AdminUser = () => {
  return (
    <>
      <WrapperHeader><h1>Quản lý Người dùng</h1></WrapperHeader>

    <div style={{marginTop:'10px'}}>
        <Button style={{height:'150px', width:'150px', borderRadius:'6px', borderStyle:'dotted'}}>
            <PlusOutlined  style={{
                fontSize:'60px'
            }} />
        </Button>
    </div>
    
    <div style={{marginTop:'15px'}}>
        <TableComponent/>
    </div>
    
      
    </>
    
  )
}

export default AdminUser
