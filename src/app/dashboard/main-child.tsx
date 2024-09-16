import Orders from '@/components/features/orders';
import React, { FC } from 'react'
import Users from '../users/page';
import Notice from '../notice/page';
import { User } from '../users/columns';
import Products, { Product } from '../products/page';

type Props = {}

interface MainChildProps {
    session: any;
    option: string;
    userdata: User[];
    productdata: Product[]; 
}

// const MainChild: FC<MainChildProps> = ({ session, option, userdata, productData}) => {
//     console.log("MAin child", option)

//     if(option == "Dashboard") return <Orders />

//     if(option == "Orders") return <Notice />

//     if(option == "Products") return console.log("Products", productData)
    
//     if(option == "Customers") return <Users />
    
// }

const MainChild: FC<MainChildProps> = ({ session, option, userdata, productdata }) => {
  console.log("Main child option:", option);

  switch (option) {
    case "Dashboard":
      return <Orders />;

    case "Orders":
      return <Notice />;

    case "Products":
      console.log("Products", productdata);
      // Return a placeholder element or component for "Products"
      return <Products productdata={productdata} /> 

    case "Customers":
      return <Users />;

    default:
      return <div>Select an option from the sidebar</div>;
  }
};
export default MainChild