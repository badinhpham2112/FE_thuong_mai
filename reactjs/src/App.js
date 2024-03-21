
import React, { Fragment, useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import OrderPage from './pages/OrderPage/OrderPage';
import { routes } from './routes';
import HeaderConponents from './components/HeaderComponents/HeaderConponents';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import {
  useQuery,
  // useMutation,
  // useQueryClient,
  // QueryClient,
  // QueryClientProvider,
} from 'react-query'
import jwt_decode from "jwt-decode";
import { isJsonString } from './Utils';
import * as UserService from './Service/UserService';
import { resetUser, updateUser } from './redux/slides/userSlide'
import { useSelector, useDispatch} from 'react-redux';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';
import DefaultBottomComponent from './components/DefaultBottomComponent/DefaultBottomComponent';


function App() {

  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setisLoading(true)
    const {storageData, decoded} = handleDecoded()
    if(decoded?.id){
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setisLoading(false)
  },[])

  const handleDecoded = () => { 
    let storageData =  localStorage.getItem('access_token')
    
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWt.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken =  jwt_decode(refreshToken)
    if(decoded?.exp < currentTime.getTime()/1000){
      if(decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        // const data = await UserService.refreshToken(refreshToken)
      const data = await UserService.refreshToken(refreshToken)
      config.headers['token'] = `Bearer ${data?.access_token}`
    }else {
      dispatch(resetUser())
       }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    console.log('refreshToken: ', refreshToken)
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({...res?.data, access_token: token, refreshToken: refreshToken}))
   
  }

  return (
    <div>
      <LoadingComponent isLoading={isLoading}>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const ischeckAuth = !route.isPrivate || user.isAdmin;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            const LayoutBottom = route?.isShowHeaderBottom ? DefaultBottomComponent : Fragment;
            const path = ischeckAuth ? route.path : null; // Xác định `path` dựa trên `ischeckAuth`
            return (
              <Route key={route.path} path={path} element={
                <Layout>
                  <Page/>
                  <LayoutBottom/>
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
      </LoadingComponent>
    </div>
  )
}

export default App;
