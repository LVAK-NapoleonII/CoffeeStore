const UserService = require('../services/UserService.js')
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken,refreshTokenJwtService } = require("../services/JWTService")
const createUser = async(req, res) => {
    try {
        const { email, password, confirmPassword} = req.body
        const reg = /^\w+@\w+\.com$/i
        const isCheckEmail = reg.test(email) 
        if(email===null || password===null ){
            return res.status(200).json({
                status:'ERR',
                messages:'Không được để trống!'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Tên tài khoản phải là định dạng email!!!'
          })
        }
          else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Mật khẩu không chính xác!!!'
            })
        }
        //console.log('isCheckEmail',isCheckEmail)
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
           messages: e
        })
    }
}
const signinUser = async (req, res) => {
  try {
      const { email, password } = req.body
      const reg =/^\w+@\w+\.com$/i
      const isCheckEmail = reg.test(email)
      if (email ===null|| password===null) {
          return res.status(200).json({
              status: 'ERR',
              message: 'Không được để trống!'
          })
      } else if (!isCheckEmail) {
          return res.status(200).json({
              status: 'ERR',
              message: 'Tên tài khoản phải là định dạng email!!!'
          })
      }
      const response = await UserService.signinUser(req.body)
    //   console.log('response',response)
      const { refresh_token, ...newReponse } = response
      res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          path: '/',
      })
      return res.status(200).json({...newReponse, refresh_token})
  } catch (e) {
      return res.status(404).json({
          message: e
      })
  }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    console.log('req.cookies.refresh_token',req.cookies.refresh_token)
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
        return 
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    console.log('req.cookies.refresh_token',req.cookies.refresh_token)
    try {
        res.clearCookie('refresh-token')
        return res.status(200).json({
            status:'OK',
            message:'Đăng xuất thành công!'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
  
module.exports = {
    createUser,
    signinUser,
    logoutUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}