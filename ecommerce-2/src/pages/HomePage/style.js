import styled from "styled-components"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import { createTheme } from '@mui/material/styles';

export const StyledBody = styled.body`
background-color:#FFF8EA;
  margin: 0;
  padding: 0; 
`
;

export const WrapperTypeProduct = styled.div`
display: flex;
align-items: center;
gap: 25px;
justify-content: flex-start;
height: 45px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
&:hover {
    color: #fff;
    background: rgb(150,114,89);
    span {
        color: #fff;
    }
}
width: 100%;
text-align: center;
`
   


export const WrapperProducts = styled.div`
display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    flex-wrap: wrap;
`
    