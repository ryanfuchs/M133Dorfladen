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

export type  User = {
    vorname: String;
    nachname: String;
    email: String;
  }