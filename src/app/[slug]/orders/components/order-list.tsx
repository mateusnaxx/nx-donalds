import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderListProps {
    orders: Prisma.OrderGetPayload<{
        include: {
            Restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            },
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    }>[]
}

const getStatusLabel = (status: OrderStatus) => {
    if (status === 'FINISHED') {
        return 'Finalizado'
    }

    if (status === 'IN_PREPARATION') {
        return 'Em preparo'
    }

    if (status === 'PENDING') {
        return 'Pedente'
    }
    return ""
}

const OrderList = ({orders}: OrderListProps) => {
    return ( 
        <div className="space-y-6 p-6">
            <Button className="rounded-full" size="icon" variant="secondary">
                <Link href="/nx-donalds">
                    <ChevronLeftIcon/>
                </Link>
            </Button>

            <div className="flex items-center gap-3">
                <ScrollTextIcon/>
                <h2 className="text-lg font-semibold">Meus Pedidos</h2>
            </div>
            {orders.map(order => (
                <Card key={order.id}>
                    <CardContent className="p-5 space-y-4">
                        <div className={`w-fit rounded-full px-2 py-1 text-xs font-semibold 
                            ${order.status === OrderStatus.FINISHED ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}
                            `}>
                            {getStatusLabel(order.status)}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative h-5 w-5">
                                <Image src={order.Restaurant.avatarImageUrl} alt={order.Restaurant.name} fill className="rounded-sm"/>
                            </div>
                            <p className="font-semibold text-sm">{order.Restaurant.name}</p>
                        </div>

                        <Separator/>

                        <div className="space-y-2">
                            {order.orderProducts.map(orderProduct => (
                                <div key={orderProduct.id} className="flex items-center gap-2">
                                    <div className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-semibold">
                                        {orderProduct.quantity}
                                    </div>
                                    <p className="text-sm">{orderProduct.product.name}</p>
                                </div>
                            ))}
                        </div>
                        

                        <Separator />

                        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default OrderList;