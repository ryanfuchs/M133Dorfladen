export type Hero = {
    name: string;
}
export type Product = {
    id: number;
    productName: string;
    specialOffer: number;
    normalPrice: number;
    imageName: string;
    description: string;
}

export type CartItem = {
    product: Product;
    amount: number;
}