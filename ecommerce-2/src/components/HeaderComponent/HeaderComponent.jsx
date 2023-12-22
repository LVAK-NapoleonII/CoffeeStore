import React,{useState} from 'react';
import { Badge, Button, Col, Popover, Row } from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
// import Search from 'antd/lib/transfer/search';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from'../../service/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';

const HeaderComponent = ({isHiddenSearch = false ,isHiddenCart=false}) => {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const user = useSelector((state) => state.user)

    console.log('user: ',user)
    
    const handleNavigateLogin = () =>{
        navigate('/sign-in')
    }
  
    const handleNavigateHome = () =>{
        navigate('/')
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser() 
        dispatch(resetUser())
        setLoading(false)
    }

    const content = (
        <div>
          <WrapperContentPopup>Thông tin người dùng</WrapperContentPopup>

          {user?.isAdmin && (
            <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
          )}

        <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
          
        </div>
      );

    return (
        <div>
            <WrapperHeader style={{ display:'flex', justifyContent: isHiddenSearch && isHiddenCart ?'space-between' :'unset'}} >
                <Col span={5}>
                    <WrapperTextHeader 
                        onClick={handleNavigateHome}
                        style={{
                            cursor:"pointer"
                        }}
                        >Cái Quán Cà Phê</WrapperTextHeader>
                </Col>
                
                {!isHiddenSearch && (
                    <Col span={10}>
                    <ButtonInputSearch size="large" placeholder="Tìm kiếm ..." textButton="Tìm"/>
                </Col>
                )}
                
                    {/* <Loading isLoading={loading}> */}
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: '30px' }} />

                        {user?.name ? (
                            <>
                            <Popover content={content}
                            trigger="click">
                            <div style={{cursor:"pointer"}}>{user.name}</div>
    </Popover>
                            
                            </>
                        ):  (
                            <div>
                            <WrapperTextHeaderSmall>
                                <button 
                                    style={{backgroundColor:'#38220f', 
                                    border:'none',
                                    cursor:"pointer",
                                    padding:"0px"}}
                                    onClick={handleNavigateLogin}
                                    >
                                        Đăng ký / Đăng nhập</button>
                            </WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                        )}
                        
                    </WrapperHeaderAccount>
                    {/* </Loading> */}
                    {!isHiddenCart && (
                        <Col span={1}  style={{display: 'flex', gap: '90px'}}>
                        <div style={{marginLeft:'55px'}}>
                            <Badge count={4} size='small'>
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Đơn hàng</WrapperTextHeaderSmall>
                        </div>
                    </Col>
                        
                    )}
                    
            </WrapperHeader>

           

        </div>
    )
}

export default HeaderComponent