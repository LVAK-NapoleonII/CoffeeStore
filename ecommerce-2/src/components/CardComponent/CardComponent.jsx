import React from 'react'
// import { Card } from 'antd';
import { StyleNameProduct, WrapperCardStyle, WrapperPriceDiscountText, WrapperPriceText, WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/Hot.png'

const CardComponent = (props) => {
    const {countInStock,description,name,image,price,rating,type, discount, selled} = props
    return (
        <WrapperCardStyle
            hoverable
            headStyle={{width: '200px', height: '200px'}}
            style={{ width: 200 }}
            bodyStyle={{padding: '10px'}}
            cover={<img alt="example" src="https://caphecaonguyen.vn/uploads/details/2021/08/images/cach-pha-ca-phe-capuchino-khong-can-may-nhanh-nhat1.jpg.webp" />}>

            <img src={logo} alt='logo' style={{width: '68px', height: '14px', position: 'absolute', top: -1, left: -1, borderTopLeftRadius: '3px'}}/>
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{marginRight: '4px'}}>
                    <span>{rating} </span> <StarFilled style={{fontSize: '12px', color: 'yellow'}}/>
                </span>
                <span> | Đã bán {selled || 1000}+</span>
            </WrapperReportText>

            <WrapperPriceText>{price}
                <WrapperPriceDiscountText>{discount || 5}%</WrapperPriceDiscountText>
            </WrapperPriceText>

        </WrapperCardStyle>
    )
}

export default CardComponent
