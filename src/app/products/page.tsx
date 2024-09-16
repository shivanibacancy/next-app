"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {}

type CardProps = React.ComponentProps<typeof Card>;

export type Product = {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: object,
    title: string,
    //product: object,
}

interface ProductProps {
    productdata?: Product[];
}

function Products({productdata}: ProductProps) {
   
    const [data, setData] = useState<Product[]>([])
    const [showFullDescription, setShowFullDescription] = useState<boolean[]>([])

    useEffect(() => {
        if(productdata) {
            setData(productdata)
            setShowFullDescription(new Array(productdata.length).fill(false));
        } 
    }, [productdata])

    const toggleDescription = (index: number) => {
      setShowFullDescription((prev) =>
        prev.map((val, i) => (i === index ? !val : val))
      );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.map((product, index) => {
                const words = product.description.split(" ");
                const isLongDescription = words.length > 25;
                const descriptionToShow = isLongDescription && !showFullDescription[index]
                  ? words.slice(0, 20).join(" ") + "..."
                  : product.description;

                return(
                    <Card key={index}>
                    <CardHeader>
                        <CardTitle>{product.title}</CardTitle> 
                        <CardDescription>
                        {descriptionToShow}
                        {isLongDescription && (
                            <Button
                                variant="link"
                                className="text-blue-500 ml-2"
                                onClick={() => toggleDescription(index)}
                            >
                                {showFullDescription[index] ? "See less" : "See more..."}
                            </Button>
                        )}    
                        </CardDescription> 
                    </CardHeader>
                    <CardContent className="w-[200] h-[200]">
                        <img src={product.image} alt={product.title} width={100} height={100} /> 
                        <p>${product.price}</p> 
                    </CardContent>
                    <CardFooter>
                        <Button>Add to Cart</Button> {/* Example button */}
                    </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
}

export default Products;

