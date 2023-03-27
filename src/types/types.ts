export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
    rating: {
        count: number,
        rate: number
    }
};

export type CartItem = {
    id: number;
    product: Product;
    quantity: number;
    totalPrice: number;
}

export type Cart = {
    items: CartItem[];
    total: number;
};
