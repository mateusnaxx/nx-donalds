import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'

import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/helpers/format-currency'

import { CartContext, CartProduct } from '../contexts/cart'

interface CartProductItemProps {
    product: CartProduct
}

const CartProductItem = ({ product }: CartProductItemProps) => {
    const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
        useContext(CartContext)
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative h-20 w-20">
                    <Image
                        className="rounded-xl bg-gray-100"
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                    />
                </div>

                <div className="space-y-1">
                    <p className="max-w-[85%] truncate text-ellipsis text-xs">
                        {product.name}
                    </p>
                    <p className="text-sm font-semibold">
                        {formatCurrency(product.price)}
                    </p>

                    <div className="flex items-center gap-1 text-center">
                        <Button
                            onClick={() => decreaseProductQuantity(product.id)}
                            variant="outline"
                            className="h-7 w-7 rounded-xl"
                        >
                            <ChevronLeftIcon />
                        </Button>

                        <p className="w-7 text-xs">{product.quantity}</p>

                        <Button
                            onClick={() => increaseProductQuantity(product.id)}
                            variant="destructive"
                            className="h-7 w-7 rounded-xl"
                        >
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
            </div>

            <div>
                <Button
                    onClick={() => removeProduct(product.id)}
                    className="h7 w-7 rounded-xl"
                    variant="secondary"
                >
                    <TrashIcon />
                </Button>
            </div>
        </div>
    )
}

export default CartProductItem
