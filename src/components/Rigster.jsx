import { Password } from "@mui/icons-material";
import { useState } from "react";
import { Authenticate } from "../Api/payment_Api";

export default function Register(){
    const [formData,setFormData]=useState({
        FirstName:'',LastName:'',password:'',email:''
    })
    const handleChange=e=>{
        const [name,value]=e.target;
        setFormData(e=>({...e,[name]:value}));
    }
    const handleSubmit=e=>{
        e.preventSefault();
        const response=Authenticate(formData);
    }
    return(
      <form  onSubmit={handleSubmit} >
        <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} />
        <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} />
        <input type="password" name="password" value=
        {formData.password} onChange={handleChange} />
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <button type="submit">Rigister</button>
     </form>
    );
}