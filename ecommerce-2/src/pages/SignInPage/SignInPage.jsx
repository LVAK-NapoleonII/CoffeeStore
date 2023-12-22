import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assets/images/logo.png'
import {Divider, Image} from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, TextField, InputAdornment, IconButton } from '@mui/material';
import { Typography } from 'antd';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as UserService from'../../service/UserService'
import { useMutationHooks } from '../../hooks/userMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'


const SignInPage = () => {
  
  const [email, setemail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleOnchangePassword = (value) => {
    setShowPassword(!showPassword);
  }

  const handleLogin = () => {
    // Xử lý đăng nhập 
    mutation.mutate({
      email,
      password
    })
    console.log('email:', email);
    console.log('Password:', password);
  };


  const navigate = useNavigate();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )

  const {data, isPending, isSuccess, isError} = mutation

  console.log('mutation success!',mutation)

  useEffect(() => {
    if(isSuccess){
      navigate('/')
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token)
        console.log('decode',decoded)
        if(decoded?.id){
            handleGetDetailsUser(decoded?.id,data?.access_token)
        }
      }
    }
  },[isSuccess])

  const handleGetDetailsUser = async (id, token) =>{
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token:token}))
  }
    
  const handleNavigateSignUp = () =>{
      navigate('/sign-up')
  }
  
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', background:'rgba(0,0,0,0.3', height:'100vh'}}>
      <div style={{width:'800px',height:'480px', borderRadius:'20px', background:'#FFF8EA', display:'flex'}}>
      <WrapperContainerLeft>
      <DialogTitle sx={{
        backgroundColor:'#FFF8EA', 
        fontWeight:'bold', color:'#38220f', 
        display:'flex',
        justifyContent:'center'}} >Đăng Nhập</DialogTitle>
      
        <TextField
          label="abc@gmail.com"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          sx={{
            backgroundColor:'#ff8e7',

            '& label.Mui-focused': {
              color: '#38220f',
            },

            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#38220f'
              },
              '& fieldset':{
                borderColor: '#38220f',
              },
              // CSS tùy chỉnh cho outlined input
              
              color:'#38220f', 
              '&:hover fieldset': {
                borderColor: '#38220f', 
              },

            },
          
          
          }}
        />

        <TextField
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            backgroundColor:'#ff8e7',

            '& label.Mui-focused': {
              color: '#38220f',
            },

            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#38220f'
              },
              '& fieldset':{
                borderColor: '#38220f',
              },
              // CSS tùy chỉnh cho outlined input
              
              color:'#38220f', 
              '&:hover fieldset': {
                borderColor: '#38220f', 
              },

            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleOnchangePassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              ),
            }}
        />
        
        <div style={{marginTop:'20px', fontSize:'14px'}}>
          Chưa có tài khoản phải hem?
          <button
            style={{border:'none', backgroundColor:'#f5f5dc', cursor:'pointer'
            }}
            onClick={handleNavigateSignUp}
            ><u style={{color:'#38220f', fontWeight:'bold'}}> Đăng kí </u> 
          </button>ở đây nha 
        </div>
            

           {data?.status=='ERR' && <span style={{color:"red", fontSize:"14px", marginTop:"20px"}}>{data?.message}</span>} 
        <Loading isPending={isPending}>
        <Typography align='center'>
          <Button variant="contained" onClick={handleLogin} 
            sx={{
              backgroundColor:'#38220f',
              marginTop: '30px',
              justifyContent:'center',
              '&:hover': {
                backgroundColor: '#a67b5b', 
              }
            }}>
            Đăng Nhập
          </Button>
        </Typography>
        </Loading>
      </WrapperContainerLeft>

      {/* <WrapperContainerRight>
             <Image 
              src={imageLogo} 
              alt='Logo-Cái-Quán-Cà-Phê' 
              preview={false}
              height="300px" 
              width="300px"/>
      </WrapperContainerRight> */}
    </div>

    </div>
  )
}

export default SignInPage