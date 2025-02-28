import { productI } from "./product.interfcae"
import { usersI } from "./users.interface"

export interface ordersI {
    shippingAddress: {
        details: string,
        phone: string,
        city: string
    },
    taxPrice: number,
    shippingPrice: number,
    totalOrderPrice: number,
    paymentMethodType: string,
    isPaid: boolean,
    isDelivered: boolean,
    _id: string,
    user: usersI,
    cartItems:
    {
        count: number,
        _id: string,
        product: productI,
        price: 199
    }[],
    paidAt: Date,
    createdAt: Date
    updatedAt: Date,
    id: number,
}