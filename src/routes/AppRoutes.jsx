import { patch } from "@mui/material"
import Payment from "../components/payment"
import  Dashboard  from "../components/Dashboard"

    const AppRoutes=[
        {patch:'/payment',element:<Payment/>},
        {path:'/dashboard',element:<Dashboard/>}
    ]
export default AppRoutes;