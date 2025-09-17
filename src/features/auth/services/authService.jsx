import { Navigate } from "react-router-dom";
import ApiService from "../../../Api/ApiService";
export const LoginUser=async (email,password)=>{
//defual email and password
console.log(email)
var password='123';
if (password === '123') {
  return { success: true, message: 'Logged in with default credentials' };
    }else
    {
    return ApiService.post('/auth/login',{email,password})
    }
};
export const RigisterUser=async(userData)=>{
    return await ApiService.post('/auth/rigister',userData)
}