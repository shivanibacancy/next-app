import Orders from '@/components/features/orders';
import React, { FC } from 'react'
import Users from '../users/page';
import Notice from '../notice/page';

type Props = {}

interface MainChildProps {
    session:any;
    option: string;
    userdata: any; 
}

const MainChild: FC<MainChildProps> = ({ session, option, userdata}) => {
    console.log("MAin child", option)

    if(option == "Dashboard") return <Orders />

    if(option == "Orders") return <Notice />

    if(option == "Products") return <Notice /> 
    
    if(option == "Customers") return <Users userdata={userdata} />
    
}

export default MainChild