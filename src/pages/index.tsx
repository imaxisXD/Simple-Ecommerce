import Head from 'next/head'
import SearchBar from '../Components/SearchBar';
import ProductListing from '../Components/ProductListing';
import { GetStaticProps } from "next";
import { Product } from '@/types/types';
import { useState } from 'react';

interface ProductListingProps {
  products: Product[];
  categoriesList: String[];
}

interface MyHashMap {
  [key: number]: Product;
}
export default function Home({ products, categoriesList }: ProductListingProps) {
  const [filteredProduct, setFilteredProduct] = useState(products);
  const [cartItem, setCartItem] = useState<MyHashMap>({});
  const [cartCount, setCartCount] = useState<number>(0);

  function handleAddToCart(product: Product) {
    if (!cartItem[product.id]) {
      // if product does not exist in the cart, add it with quantity 1
      const newProduct = {
        ...product,
        quantity: 1
      };
      setCartItem(prevCartItem => ({
        ...prevCartItem,
        [product.id]: newProduct
      }));
    } else {
      const updatedProduct = {
        ...cartItem[product.id],
        quantity: cartItem[product.id].quantity + 1
      };
      setCartItem(prevCartItem => ({
        ...prevCartItem,
        [product.id]: updatedProduct
      }));
    }
    setCartCount(prevCartCount => prevCartCount + 1);
  }

  function handleRemoveFromCart(product: Product) {
    if (cartItem[product.id]) {
      const updatedProduct = {
        ...cartItem[product.id],
        quantity: cartItem[product.id].quantity - 1
      };
      setCartItem(prevCartItem => ({
        ...prevCartItem,
        [product.id]: updatedProduct
      }));
    }
    if (cartItem[product.id]?.quantity > 0) {
      setCartCount(prevCartCount => prevCartCount - 1);
    }
  }

  const handleSearch = (searchText: string) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProduct(filteredProducts);
  };

  console.log(products);

  return (
    <>
      <Head>
        <title>Roc8-Ecom-Abhishek</title>
        <meta name="description" content="Simple E-comm store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

        <SearchBar products={products} onSearch={handleSearch} cartCount={cartCount} />
        <ProductListing products={products} searchProducts={filteredProduct} categoriesList={categoriesList} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      </main>
    </>
  )
}
export const getStaticProps: GetStaticProps<ProductListingProps> = async () => {
  const res1 = await fetch("https://fakestoreapi.com/products");
  let products: Product[] = await res1.json();
  const res2 = await fetch('https://fakestoreapi.com/products/categories');
  const categoriesList: String[] = await res2.json();
  const productsWithQuantity = products.map(product => ({
    ...product,
    quantity: 0
  }));
  products = productsWithQuantity;
  return {
    props: { products, categoriesList }
  };
};