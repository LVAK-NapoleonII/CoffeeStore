import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import {PlusOutlined,UploadOutlined,DeleteOutlined,EditOutlined  } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import { useMutationHooks } from '../../hooks/userMutationHook'
import * as UserService from'../../service/UserService'
import * as ProductService from '../../service/ProductService'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import * as message from '../../components/Message/Message'
import ModalComponent from '../ModalComponent/ModalComponent'
import ChartComponent from '../ChartComponent/ChartComponent'


const AdminProduct = () => {

const [isModalOpen, setIsModalOpen] = useState(false);

const [rowSelected, setRowSelected] = useState('')

const [isOpenDrawer, setIsOpenDrawer] = useState(false)

const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

// const [drinkData, setDrinkData] = useState(''); // Thêm state để lưu trữ dữ liệu đồ uống

const [form] = Form.useForm();

const user = useSelector((state) => state?.user)

const mutation = useMutationHooks(
  (data) => {
      const { name,
      price,
      description,
      rating,
      image,
      type,
      countInStock} = data
  ProductService.createProduct({name,
          price,
          description,
          rating,
          image,
          type,
          countInStock})
  }
)

const mutationUpdate = useMutationHooks(
  (data) => {
    console.log('data',data)
    const { id,
      token,
      ...rests } = data
    ProductService.updateProduct(
      id,
      token,
      { ...rests })
  },
  
)

const mutationDelete = useMutationHooks(
  (data) => {
    console.log('data',data)
    const { id,
      token} = data
    const res = ProductService.deleteProduct(
      id,
      token)
      return res
  },
 
  
)

const { data,  isSuccess, isError } = mutation
const { data:dataUpdate,  isSuccess:isSuccessUpdate, isError:isErrorUpdate } = mutationUpdate

const { data:dataDelete,  isSuccess:isSuccessDelete, isError:isErrorDelete } = mutationDelete


const [stateProductDetails, setStateProductDetails] = useState({
  name:'',
  price:'',
  description:'',
  rating:'',
  image:'',
  type:'',
  countInStock:''
})

useEffect(() => {
  form.setFieldsValue(stateProductDetails)
},[form,stateProductDetails])

useEffect(() => {
  if(rowSelected){
    fetchGetDetailsProduct(rowSelected)
  }
},[rowSelected])

useEffect(() => {
  if (isSuccess && data?.status === 'OK') {
    message.success()
    handleCancel()
  } else if (isError) {
    message.error()
  }
}, [isSuccess,data])

useEffect(() => {
  if (isSuccessUpdate && dataUpdate?.status === 'OK') {
    message.success()
    handleCloseDrawer()
  } else if (isErrorUpdate) {
    message.error()
  }
}, [isSuccessUpdate])

useEffect(() => {
  if (isSuccessDelete && dataDelete?.status === 'OK') {
    message.success()
    handleCancelDelete()
  } else if (isErrorDelete) {
    message.error()
  }
}, [isSuccessDelete])

// useEffect(() => {
//   // Gọi API hoặc service để lấy dữ liệu đồ uống
//   ProductService.getAllProduct().then(({data}) => setDrinkData({data}));
// }, []);



const fetchGetDetailsProduct = async (rowSelected) =>{
  const res = await ProductService.getDetailProduct(rowSelected)
  if(res?.data){
    setStateProductDetails({
      name:res?.data?.name,
      price:res?.data?.price,
      description:res?.data?.description,
      rating:res?.data?.rating,
      image:res?.data?.image,
      type:res?.data?.type,
      countInStock:res?.data?.countInStock
    })
  }
  
}

console.log('StateProduct',stateProductDetails)

const handleDetailsProduct = () =>{
  if(rowSelected){
   fetchGetDetailsProduct()
   
  }
  setIsOpenDrawer(true)
}



const [stateProduct, setStateProduct] = useState({
    name:'',
    price:'',
    description:'',
    rating:'',
    image:'',
    type:'',
    countInStock:''
})



const renderAction = () =>{
  return (
    <div>
      <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
      <EditOutlined onClick={handleDetailsProduct} style={{color:'green', fontSize:'30px', cursor:'pointer'}} />
    </div>
  )
}

const getAllProducts = async () =>{
  const res = await ProductService.getAllProduct()
  return res 
}


console.log('dataUpdated',dataUpdate)

const { data: products, error } = useQuery({
  queryKey: ['products'],
  queryFn: getAllProducts
});

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: renderAction,
  },
];

const dataTable = products?.data?.length && products?.data?.map((product) => {
  return { ...product, key: product._id };
});

const dataChart = products?.data?.length && products?.data?.map((product) => {
  return { ...product, key: product._id };
});

const handleOnchange = (event) => {
  const { name, value } = event.target;
  setStateProduct(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleOnchangeDetails = (event) => {
  const { name, value } = event.target;
  setStateProductDetails(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleDeleteProduct = () =>{
  mutationDelete.mutate({ id: rowSelected, token: user?.access_token })
}

const handleCancelDelete = () =>{
  setIsModalOpenDelete(false)
}

const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name:'',
      price:'',
      description:'',
      rating:'',
      image:'',
      type:'',
      countInStock:''
    })
    form.resetFields()
}

const handleCloseDrawer = () => {
  setIsOpenDrawer(false);
  setStateProductDetails({
    name:'',
    price:'',
    description:'',
    rating:'',
    image:'',
    type:'',
    countInStock:''
  })
  form.resetFields()
}


const onFinish = () => {
    mutation.mutate(stateProduct)
    console.log('finish',stateProduct)
}

const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj );
    }
    setStateProduct({
        ...stateProduct,
        image: file.preview
    })
}

const handleOnchangeAvatarDetails = async ({fileList}) => {
  const file = fileList[0]
  if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj );
  }
  setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
  })
}

  console.log('user',user)
  const onUpdateProduct = () =>{
    mutationUpdate.mutate(  mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }))
  }

  return (
    <>
    <WrapperHeader><h1>Quản lý Sản phẩm</h1></WrapperHeader>

    <div style={{marginTop:'10px'}}>
        <Button style={{height:'150px', width:'150px', borderRadius:'6px', borderStyle:'dotted'}}
        onClick={() => setIsModalOpen(true)}>
            <PlusOutlined  style={{
                fontSize:'60px'
            }} />
        </Button>
    </div>
    
    <div style={{marginTop:'15px'}}>
        <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
     return {
      onClick: event => {
        setRowSelected(record._id)
      }
    };
  }}/>
    </div>

    <ModalComponent title="Tạo sản phẩm" open={isModalOpen}  onCancel={handleCancel} 
    okButtonProps={{ style: { display: 'none' } }}>

    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
    form={form}
  
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input product type',
        },
      ]}
    >
      <InputComponent value={stateProduct.name} onChange={handleOnchange}  name="name"/>
    </Form.Item>

    <Form.Item
      label="Type"
      name="type"
      rules={[
        {
          required: true,
          message: 'Please input product type!',
        },
      ]}
    >
      <InputComponent value={stateProduct.type} onChange={handleOnchange}  name="type" />
    </Form.Item>

    <Form.Item
      label="Count in Stock"
      name="countInStock"
      rules={[
        {
          required: true,
          message: 'Please input product countInStock!',
        },
      ]}
    >
      <InputComponent value={stateProduct.countInStock} onChange={handleOnchange}  name="countInStock" />
    </Form.Item>

    <Form.Item
      label="Price"
      name="price"
      rules={[
        {
          required: true,
          message: 'Please input product price!',
        },
      ]}
    >
      <InputComponent value={stateProduct.price} onChange={handleOnchange}  name="price" />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input product description!',
        },
      ]}
    >
      <InputComponent value={stateProduct.description} onChange={handleOnchange}  name="description" />
    </Form.Item>

    <Form.Item
      label="Rating"
      name="rating"
      rules={[
        {
          required: true,
          message: 'Please input product rating!',
        },
      ]}
    >
      <InputComponent value={stateProduct.rating} onChange={handleOnchange}  name="rating" />
    </Form.Item>

    <Form.Item
      label="Image"
      name="image"
      rules={[
        {
          required: true,
          message: 'Please input product image!',
        },
      ]}
    >
      <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                    <Button>Select File</Button>
                    {stateProduct?.image && (
                            <img src={stateProduct?.image} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
    </WrapperUploadFile>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </ModalComponent>

    <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%">
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onUpdateProduct}
    autoComplete="off"
    form={form}
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input product type',
        },
      ]}
    >
      <InputComponent value={stateProductDetails.name} onChange={handleOnchangeDetails}  name="name"/>
    </Form.Item>

    <Form.Item
      label="Type"
      name="type"
      rules={[
        {
          required: true,
          message: 'Please input product type!',
        },
      ]}
    >
      <InputComponent value={stateProductDetails.type} onChange={handleOnchangeDetails}  name="type" />
    </Form.Item>

    <Form.Item
      label="Count in Stock"
      name="countInStock"
      rules={[
        {
          required: true,
          message: 'Please input product countInStock!',
        },
      ]}
    >
      <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails}  name="countInStock" />
    </Form.Item>

    <Form.Item
      label="Price"
      name="price"
      rules={[
        {
          required: true,
          message: 'Please input product price!',
        },
      ]}
    >
      <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails}  name="price" />
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input product description!',
        },
      ]}
    >
      <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails}  name="description" />
    </Form.Item>

    <Form.Item
      label="Rating"
      name="rating"
      rules={[
        {
          required: true,
          message: 'Please input product rating!',
        },
      ]}
    >
      <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails}  name="rating" />
    </Form.Item>

    <Form.Item
      label="Image"
      name="image"
      rules={[
        {
          required: true,
          message: 'Please input product image!',
        },
      ]}
    >
      <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                    <Button>Select File</Button>
                    {stateProduct?.image && (
                            <img src={stateProduct?.image} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar"/>
                        )}
    </WrapperUploadFile>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </Form.Item>
  </Form>  
      
      
    </DrawerComponent>  

    <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete}  onCancel={handleCancelDelete} onOK={handleDeleteProduct}
    >

    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
    form={form}
  >
  </Form>
      
      <div>Bạn có chắc xóa sản phẩm này không?</div>
      </ModalComponent> 
    
    {/* Thêm biểu đồ vào trang */}
    <div style={{ marginTop: '15px' }}>
      <ChartComponent drinkData={dataChart} />
    </div>
      
    </>
    
  )
}

export default AdminProduct
