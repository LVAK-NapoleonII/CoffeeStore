import React, { useState } from 'react'
import { Input } from 'antd';
import { WrapperInputStyle } from './style';


const InputForm = (props) => {
    const {placeholder='Nhập text',...rests} = props 

  return (
   
    <WrapperInputStyle placeholder={placeholder} valueInput={props.value}/> 
    

  )
}

export default InputForm