import React, {useState} from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { StyledBody, WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import love from '../../assets/images/Love.png'
import passion from '../../assets/images/Passion.png'
import respect from '../../assets/images/Respect.png'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import * as ProductService from '../../service/ProductService'
import { useQuery } from '@tanstack/react-query'

const HomePage = () => {

  
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res',res)
    return res
  }

  const { data: products } = useQuery({ queryKey: ['products'], queryFn: fetchProductAll });
  console.log('data',products)
 
  return (
    <>
        <StyledBody>
        <NavbarComponent/>
        <SliderComponent arrImages={[love, passion, respect]} />
        <WrapperProducts>
          {products?.data?.map((product)=>{
            return (
              <CardComponent 
              key={product._id}
              countInStock={product.countInStock}
              description={product.description} 
              image={product.image} 
              name={product.name} 
              price={product.price}
              rating = {product.rating}
              type={product.type}
              discount= { product.discount }
              selled={ product.selled}   />
            )
             
          })}
         
        </WrapperProducts>
        
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
          <WrapperButtonMore
            textButton="Xem thêm"
            type="outline"
            styleButton={{ border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)', width: '240px', height: '38px', borderRadius: '5px' }}
            styleTextButton={{ fontWeight: '500' }}
          />
        </div>

        </StyledBody>


    </>
  )
}

export default HomePage
