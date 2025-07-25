'use server'

import { consumptionMethod } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/prisma'

import { RemoveCpfPunctuation } from '../helpers/cpf'

interface CreateOrderInput {
    customerName: string
    customerCpf: string
    products: Array<{
        id: string
        quantity: number
    }>
    consumptionMethod: consumptionMethod
    restaurantId: string
}

export const CreateOrder = async (input: CreateOrderInput) => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            id: input.restaurantId,
        },
    })

    if (!restaurant) {
        throw new Error('Restaurant not found')
    }

    const productsWithPrices = await db.product.findMany({
        where: {
            id: {
                in: input.products.map((product) => product.id),
            },
        },
    })

    const productsWithPricesAndQuantities = input.products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: productsWithPrices.find((p) => p.id === product.id)!.price,
    }))

    await db.order.create({
        data: {
            status: 'PENDING',
            customerName: input.customerName,
            customerCpf: RemoveCpfPunctuation(input.customerCpf),
            orderProducts: {
                createMany: {
                    data: productsWithPricesAndQuantities,
                },
            },
            total: productsWithPricesAndQuantities.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0,
            ),
            consumptionMethod: input.consumptionMethod,
            restaurantId: restaurant.id,
        },
    })

    revalidatePath(`/orders`)
    redirect(`/orders?cpf=${RemoveCpfPunctuation(input.customerCpf)}`)
}
