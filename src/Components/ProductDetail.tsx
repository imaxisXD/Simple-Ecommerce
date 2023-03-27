import { Product } from '@/types/types';
import Image from 'next/image';

export default function ProductDetails({ product }: { product: Product }) {
    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen py-12 bg-gray-50">
            <div className="relative w-full max-w-2xl h-96 md:h-128">
                <Image
                    src={product.image}
                    alt={product.title}
                />
            </div>
            <div className="w-full max-w-2xl mt-8 bg-white rounded-2xl shadow-lg p-8 backdrop-blur-lg backdrop-filter bg-opacity-70">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <p className="mt-4 text-gray-500">{product.description}</p>
                <div className="mt-4 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 .75l2.06 6.32h6.68l-5.39 3.91 2.06 6.32L10 14.25l-5.39 3.91 2.06-6.32L3.26 7.07h6.68L10 .75z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-2 text-gray-700">{product.rating.rate}</span>
                    </div>
                    <div className="text-gray-500">
                        <span className="text-sm">Category:</span> {product.category}
                    </div>
                </div>
                <div className="mt-8 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-between bg-gray-200 rounded-lg px-4 py-2">
                        <button className="text-lg font-bold text-gray-700">-</button>
                        <span className="mx-4 text-lg font-bold text-gray-700">1</span>
                        <button className="text-lg font-bold text-gray-700">+</button>
                    </div>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors duration-300">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}
