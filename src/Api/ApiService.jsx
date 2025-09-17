import axios from 'axios'


const ApiUrl='localhost:2020/Api'
const api=axios.create({
    baseUrl:ApiUrl,
    header:{'Content-Type':'application/json'}
})
const ApiService={
get:async (endpoint,params)=>{
    console.log(params,endpoint)
    const response=await api.get(endpoint,{params});
    return response.data;
},
post:async(endpoint,params)=>{
    const response=await api.post(endpoint,{params})
    return response.data;
},
setAuthToken:(token)=>{
    api.defaults.headers.common['Authorization']='Bearer ${token}'
}};
export default ApiService