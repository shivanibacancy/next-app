import Orders from '@/components/features/orders';
import React, { FC } from 'react'
import Users from '../users/page';

type Props = {}

interface MainChildProps {
    session:any;
    option: string;
}

const MainChild: FC<MainChildProps> = ({ session, option}) => {
    console.log("MAin child", option)

    if(option == "Dashboard") return <Orders />

    if(option == "Orders") return "Orders Page"

    if(option == "Products") return "Product Page" 
    
    if(option == "Customers") return <Users />
    
}

export default MainChild