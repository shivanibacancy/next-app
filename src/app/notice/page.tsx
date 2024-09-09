import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type Props = {}

function Notice({}: Props) {
  return (
    <div>
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Notice: Northern Region Delayed Delivery</AccordionTrigger>
                <AccordionContent>
                Due to heavy rains in the northern region, please expect a delay in delivery. We appreciate your understanding and patience during this time.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Notice: Limited Edition Stock</AccordionTrigger>
                <AccordionContent>
                We are excited to announce that we have a limited edition item available for purchase! Due to the exclusive nature of this product, quantities are limited. We encourage you to act quickly to secure your order, as once they are gone, they may not be restocked. Thank you for your interest, and we appreciate your support in making this limited edition a success!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Notice: Birthday Month of Our Brand</AccordionTrigger>
                <AccordionContent>
                We are thrilled to celebrate the birthday month of our brand! This special occasion marks another year of providing you with quality products and exceptional service. To show our appreciation, we will be hosting various promotions and events throughout the month. Stay tuned for exciting offers and surprises as we celebrate this milestone together with our valued customers. Thank you for being a part of our journey!
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  )
}

export default Notice