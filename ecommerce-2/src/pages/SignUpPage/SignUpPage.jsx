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



const SignUpPage = () => {
  const [email, setEmail] = useState('');

  const [password,setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [success, setIsSuccess] = useState(false);
  const [error, setIsError] = useState(false);

  const handleOnchangePassword = (value) => {
    setShowPassword(!showPassword);
  }

  const handleOnchangeConfirmPassword = (value) => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleSignup = async () => {
    // Xử lý đăng kí 
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
    console.log('email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:',confirmPassword);
  };


  const navigate = useNavigate();
    
  const handleNavigateLogIn = () =>{
      navigate('/sign-in')
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const {data, isPending, isSuccess, isError} = mutation

  useEffect(() => {
    if(isSuccess){
      message.success()
      handleNavigateLogIn()
    }
    else if (isError){
      message.error()
    }
  }, [isSuccess,isError])

 

  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center', background:'rgba(0,0,0,0.3', height:'100vh'}}>
      <div style={{width:'800px',height:'550px', borderRadius:'20px', background:'#FFF8EA', display:'flex'}}>
      <WrapperContainerLeft>
      <DialogTitle sx={{
        backgroundColor:'#FFF8EA', 
        fontWeight:'bold', color:'#38220f', 
        display:'flex',
        justifyContent:'center'}} >Đăng Kí</DialogTitle>
      
        <TextField
          label="abc@gmail.com"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          varriant="filled" 
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

        <TextField
          label="Nhập lại mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
                <IconButton onClick={handleOnchangeConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              ),
            }}
        />
        
        <div style={{marginTop:'20px', fontSize:'14px'}}>
          Đã có tài khoản?
          <button
            style={{border:'none', backgroundColor:'#f5f5dc', cursor:'pointer'
            }}
            onClick={handleNavigateLogIn}
            ><u style={{color:'#38220f', fontWeight:'bold'}}> Đăng nhập </u> 
          </button>ở đây nha 
        </div>
        
        {data?.status=='ERR' && <span style={{color:"red", fontSize:"14px", marginTop:"20px"}}>{data?.message}</span>}
        <Loading isPending={isPending}>
        <Typography align='center'>
          <Button variant="contained" onClick={handleSignup} 
            sx={{
              backgroundColor:'#38220f',
              marginTop: '30px',
              justifyContent:'center',
              '&:hover': {
                backgroundColor: '#a67b5b', 
              }
            }}>
            Đăng Kí
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

export default SignUpPage