import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import ProductDetails from "./ProductDetail";

interface ProductListingProps {
    products: Product[];
    categoriesList: String[];
    searchProducts: Product[];
}

export default function ProductListing({ products, categoriesList, searchProducts }: ProductListingProps) {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<String>("");
    const [cart, setCart] = useState<{ [key: string]: number }>({});


    function handleFilters(event: React.MouseEvent<HTMLButtonElement>) {
        const categoryFilter = event.currentTarget.dataset.category as string;
        setCategory((prev) => prev === categoryFilter ? prev : categoryFilter);
    }
    useEffect(() => {
        if (searchProducts) {
            console.log(searchProducts);
            setFilteredProducts(searchProducts);
        }
    }, [searchProducts]);

    useEffect(() => {
        if (category === "" || category === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.category.toLowerCase() === category?.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    }, [category, products]);

    function handleBuy(product: Product) {

    }
    function handleAddToCart(product: Product) {
        const existingCartItemQuantity = cart[product.id];
        if (existingCartItemQuantity) {
            // If the item already exists in the cart, increase its quantity by 1
            const updatedCart = { ...cart };
            updatedCart[product.id] = existingCartItemQuantity + 1;
            setCart(updatedCart);
        } else {
            // If the item does not exist in the cart, add it with a quantity of 1
            const updatedCart = { ...cart, [product.id]: 1 };
            setCart(updatedCart);
        }
    }
    function handleRemoveFromCart(product: Product) {
        const existingCartItemQuantity = cart[product.id];

        if (existingCartItemQuantity) {
            // If the item exists in the cart, decrease its quantity by 1
            const updatedCart = { ...cart };
            updatedCart[product.id] = existingCartItemQuantity - 1;

            // If the quantity becomes 0, remove the item from the cart
            if (updatedCart[product.id] === 0) {
                delete updatedCart[product.id];
            }

            setCart(updatedCart);
        }


    }
    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
            <h1 className="text-4xl font-bold text-white">Product Listing</h1>
            <div >
                <button data-category="all" className="px-4 py-2 mt-4 ml-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full shadow-md hover:bg-white hover:bg-opacity-40 active:bg-red-400 active:bg-opacity-50"
                    onClick={handleFilters}>SHOW ALL</button>
                {categoriesList.map((category, index) => (
                    <button data-category={category} key={index} className="px-4 py-2 mt-4 ml-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full shadow-md hover:bg-white hover:bg-opacity-40 active:bg-red-400 active:bg-opacity-50"
                        onClick={handleFilters}>{category.toUpperCase()}</button>
                ))}

            </div>
            <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="relative flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="flex-shrink-0 h-48 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                height={500}
                                width={500}

                            />
                        </div>
                        <div className="p-4">
                            <h2 className="mt-2 text-lg font-bold text-gray-800">
                                {product.title}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-md font-semibold text-orange-400">⭐️</span>
                                <p className="ml-1 text-sm text-gray-500">
                                    ({product.rating.rate})
                                </p>
                            </div>
                            <p className="mt-2 text-lg font-bold text-gray-800">
                                ${product.price}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    className="inline-block px-4 py-2 text-lg font-bold text-white bg-purple-600 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    onClick={() => handleBuy(product)}
                                >
                                    Buy Now
                                </button>
                                <div className="ml-4 text-md font-semibold text-gray-800">
                                    <button onClick={() => handleAddToCart(product)}>+</button>
                                    {cart[product.id] ? cart[product.id] : 0}
                                    <button onClick={() => handleRemoveFromCart(product)}>-</button>

                                </div>
                            </div>
                            <Link
                                className="inline-block px-4 py-2 mt-4 text-lg font-bold text-white bg-purple-600 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                href={`/product-details`}
                            >
                                DEtails
                                {/* <ProductDetails product={product} /> */}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
