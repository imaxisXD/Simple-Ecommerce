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
export default function Home({ products, categoriesList }: ProductListingProps) {

  const [filteredProduct, setFilteredProduct] = useState(products);

  const handleSearch = (searchText: string) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProduct(filteredProducts);
  };

  return (
    <>
      <Head>
        <title>Roc8-Ecom-Abhishek</title>
        <meta name="description" content="Roc8 Ecom store assignment done by abhishek " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchBar products={products} onSearch={handleSearch} />
        <ProductListing products={products} searchProducts={filteredProduct} categoriesList={categoriesList} />

      </main>
    </>
  )
}
export const getStaticProps: GetStaticProps<ProductListingProps> = async () => {
  const res1 = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res1.json();
  const res2 = await fetch('https://fakestoreapi.com/products/categories');
  const categoriesList: String[] = await res2.json();

  return {
    props: { products, categoriesList }
  };
};