import React, { Fragment } from 'react';
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { routes } from './routes';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from'./service/UserService'

import {useDispatch, useSelector} from'react-redux'
import { updateUser } from './redux/slides/userSlide';

export function App() {

  // const fetchApi = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
  //     return res.data
  //   } catch (error) {
  //     console.error('Error fetching API:', error);
  //   }
  // };

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  // console.log('query', query)

  // useEffect(()=>{
  //   fetchApi()
  // }, [])

  // console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_KEY)

  // const fetchApi = async() => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product/get-all`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })

  // console.log('query', query)

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const {storageData, decoded} = handleDecoded()
    if(decoded?.id){
        handleGetDetailsUser(decoded?.id,storageData)
    }
    
  },[])


  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    console.log('storageData', storageData,isJsonString(storageData)) 
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
        decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }

 UserService.axiosJWT.interceptors.request.use(async (config)=> {
    // Do something before request is sent
    const currentTime = new Date();
    const {decoded} = handleDecoded()

    if(decoded?.exp < currentTime.getTime() /1000 ) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err)=> {
    // Do something with request error
    return Promise.reject(err);
  })

  const handleGetDetailsUser = async (id, token) =>{
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token:token}))
  }

  return (
    <div>
      <Router>
  <Routes>
    {routes.map((route) => {
      const Page = route.page;
      const isCheckAuth = !route.isPrivate || user.isAdmin;
      const Layout = route.isShowHeader ? DefaultComponent : Fragment;

      // Thêm điều kiện kiểm tra isCheckAuth để tránh lỗi path không hợp lệ
      const routeElement = isCheckAuth ? (
        <Layout>
          <Page />
        </Layout>
      ) : null;

      return isCheckAuth ? (
        <Route key={route.path} path={route.path} element={routeElement} />
      ) : null;
    })}
  </Routes>
</Router>

    </div>
  );
}

export default App;
