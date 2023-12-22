import * as React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox, Flex, Rate } from 'antd'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@mui/material/Typography';


const NavbarComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (index,event) => {
        setAnchorEl({[index]: event.currentTarget});
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const MenuItems = 
    {  
        "MENU": 
            [
            {
                title: 'Cà phê',
                path: '/caphe',
                cName: 'dropdown-link'
            },
            {
                title: 'Trà',
                path: '/tra',
                cName: 'dropdown-link'
            },
            {
                title: 'Freeze',
                path: '/freeze',
                cName: 'dropdown-link'
            }
            ],

            "TRÁNG MIỆNG":[
                {
                    title: 'Bánh ngọt',
                    path: '/saigon',
                    cName: 'dropdown-link'
                },
                {
                    title: 'Bánh mặn',
                    path: '/hanoi',
                    cName: 'dropdown-link'
                }
            ],

            "CHI NHÁNH":[
                {
                    title: 'Sài Gòn',
                    path: '/saigon',
                    cName: 'dropdown-link'
                },
                {
                    title: 'Hà Nội',
                    path: '/hanoi',
                    cName: 'dropdown-link'
                }
            ],
            
            "VỀ CHÚNG TÔI": 
            [
            {
                title: 'Câu chuyện thương hiệu',
                path: '/about-us',
                cName: 'dropdown-link'
            },
            {
                title: 'Dịch vụ',
                path: '/service',
                cName: 'dropdown-link'
            },
            {
                title: 'Liên hệ',
                path: '/contact',
                cName: 'dropdown-link'
            }
            ],
            
            "THẺ":[
                {
                    title: 'Thông tin thẻ thành viên',
                    path: '/thong-tin-the',
                    cName: 'dropdown-link'
                },
                {
                    title: 'Điều khoản & Điều kiện',
                    path: '/dieukhoan',
                    cName: 'dropdown-link'
                },
                {
                    title: 'Những câu hỏi thường gặp',
                    path: '/faq',
                    cName: 'dropdown-link'
                }
            ],
            "TUYỂN DỤNG":[
                {
                    title: 'Phòng ban',
                    path: '/thong-tin-the',
                    cName: 'dropdown-link'
                },
                {
                    title: 'Việc làm',
                    path: '/dieukhoan',
                    cName: 'dropdown-link'
                }
            ]

            
    };

    return (
        <div class="container" style={{backgroundColor: '#e2d3cd' }}>
            <div>
            <Toolbar>
                {Object.keys( MenuItems).map((item, index) => (
                    <div key={index}>
                <Button 
                    color="inherit" 
                    onClick={(e) => handleClick(index, e)}
                    style={{marginLeft:"110px", fontWeight:'bold'}}>
                {item}
                </Button>
                <Menu
                anchorEl={
                    anchorEl && anchorEl[index]
                }
                keepMounted
                open={
                    Boolean(anchorEl && anchorEl[index])
                }
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                
                >
                {MenuItems[item].map((menuitems, menuindex) => (
                    <MenuItem
                    key={menuindex}
                    selected={menuitems === item}
                    onClick={handleClose}
                    >
                    {menuitems.title}
                    </MenuItem>
                ))}
                </Menu>
            </div>
            ))}
        </Toolbar>
            </div>
        </div>
    )
}

export default NavbarComponent