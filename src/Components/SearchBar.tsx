import { useEffect, useState } from "react";
import Link from "next/link";
import { FcSearch } from 'react-icons/Fc';
import { TiShoppingCart } from 'react-icons/Ti';
import { Product } from "@/types/types";

interface SearchBarProps {
    products: Product[];
    onSearch: (searchText: string) => void;
}

export default function SearchBar({ products, onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (products) {
            const filteredProducts = products.filter((product) =>
                product.title.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredProducts);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        if (event.type === 'click' || (event instanceof KeyboardEvent && event.key === 'Enter')) {
            onSearch(searchTerm);
        }
    }

    const handleFocusOut = () => {
        setShowResults(false);
    }

    const cartItemsCount = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (searchTerm.length === 0 || searchResults.length === 0) {
            timer = setTimeout(() => {
                setShowResults(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [searchTerm, searchResults]);


    return (
        <div className="bg-white py-4 px-6 flex items-center justify-between shadow-lg">
            <div className="relative">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="border border-gray-300 rounded-lg flex items-center py-2 px-4 w-80">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search for products"
                        className="focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent flex-1"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onBlur={handleFocusOut}
                    />
                    <button onClick={handleSearchClick} className="ml-2">
                        <FcSearch className="h-6 w-6" />
                    </button>
                </div>
                {showResults && (
                    <ul className="absolute bg-white mt-1 w-80 shadow-lg z-50">
                        {searchResults.map((product) => (
                            <li
                                key={product.id}
                                className="flex items-center space-x-4 py-2 px-3 hover:bg-gray-100 cursor-pointer"
                            >
                                <Link
                                    className="text-gray-700 hover:underline"
                                    href={`/products/${product.id}`}
                                >
                                    {product.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Link
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                href="/cart"
            >
                <TiShoppingCart className="h-6 w-6" />
                <span className="font-medium">{cartItemsCount}</span>
            </Link>
        </div>
    )
};
