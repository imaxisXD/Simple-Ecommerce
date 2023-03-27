import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import ProductDetails from "./ProductDetail";

interface ProductListingProps {
    products: Product[];
    categoriesList: String[];
    searchProducts: Product[];
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (product: Product) => void;
}

export default function ProductListing({ products, categoriesList, searchProducts, onAddToCart, onRemoveFromCart }: ProductListingProps) {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<String>("");

    function handleFilters(event: React.MouseEvent<HTMLButtonElement>) {
        const categoryFilter = event.currentTarget.dataset.category as string;
        setCategory((prev) => prev === categoryFilter ? prev : categoryFilter);
    }
    useEffect(() => {
        if (searchProducts) {

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
        product.quantity++;
        onAddToCart(product);
    }

    function handleRemoveFromCart(product: Product) {
        if (product.quantity > 0) {
            product.quantity--;
            onRemoveFromCart(product);
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
            <div className="grid grid-cols-1 gap-4 mt-8 ml-2 mr-2 sm:grid-cols-2 lg:grid-cols-3">
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
                                    className="inline-block px-4 py-2 text-lg font-bold text-white bg-purple-600 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                    onClick={() => handleBuy(product)}
                                >
                                    Buy Now
                                </button>

                                <div className="ml-4 text-md font-semibold text-gray-800 flex items-center space-x-2">
                                    <button
                                        className="px-2 py-1 text-lg font-bold text-white bg-purple-600 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                        onClick={() => handleBuy(product)}
                                    >
                                        +
                                    </button>
                                    <p className="text-lg">{product.quantity ? product.quantity : 0}</p>
                                    {product.quantity > 0 && (
                                        <button
                                            className="px-2 py-1 text-lg font-bold text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                            onClick={() => handleRemoveFromCart(product)}
                                        >
                                            -
                                        </button>
                                    )}
                                </div>
                            </div>
                            <Link
                                className="inline-block px-4 py-2 mt-4 text-lg font-bold text-white bg-purple-600 rounded-full shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                href={`/product-details`}
                            >
                                Details
                                {/* <ProductDetails product={product} /> */}
                            </Link>

                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
