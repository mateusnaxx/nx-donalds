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
        <div className="flex items-center justify-between gap-5">
            {/* LEFT: imagem + infos */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
                {/* imagem */}
                <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                        className="rounded-xl bg-gray-100"
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                    />
                </div>

                {/* infos: nome, preço e controles */}
                <div className="flex min-w-0 flex-col space-y-1">
                    {/* nome truncando */}
                    <p className="truncate text-xs">{product.name}</p>

                    {/* preço */}
                    <p className="text-sm font-semibold">
                        {formatCurrency(product.price)}
                    </p>

                    {/* quantidade */}
                    <div className="flex items-center gap-1 text-center">
                        <Button
                            onClick={() => decreaseProductQuantity(product.id)}
                            variant="outline"
                            className="h-7 w-7 rounded-xl"
                        >
                            <ChevronLeftIcon size={14} />
                        </Button>

                        <p className="w-7 text-xs">{product.quantity}</p>

                        <Button
                            onClick={() => increaseProductQuantity(product.id)}
                            variant="destructive"
                            className="h-7 w-7 rounded-xl"
                        >
                            <ChevronRightIcon size={14} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* RIGHT: botão de apagar, sempre fixo */}
            <Button
                onClick={() => removeProduct(product.id)}
                className="h-7 w-7 flex-shrink-0 rounded-xl"
                variant="secondary"
            >
                <TrashIcon size={16} />
            </Button>
        </div>
    )
}

export default CartProductItem
