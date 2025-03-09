"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "../(components)/Header";
import Rating from "../(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

type ProductFormData = {
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
};

const Products = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [isModalOpen, setisModalOpen] = useState(false);

  const { data: products, isLoading, isError } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  }

  if (isLoading) {
    return <div className="py-4">Loading...</div>
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch products</div>
    )

  }
  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input className="w-full py-2 px-4 rounded bg-white" placeholder="Search products..." value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />
        </div>
      </div>
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold px-2 py-4 rounded" onClick={() => setisModalOpen(true)}>
          <PlusCircleIcon className="h-5 w-5 mr-2 !text-gray-200" />
          Create Product
        </button>
      </div>
      {/* BODY PRODUCT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (<div>Loading...</div>) : (
          products.map((product) => (
            <div key={product.productId} className="border shadow rounded-md p-4 max-w-full w-full mx-auto">
              <div className="flex flex-col items-center">
                <Image
                  src={`https://s3-inventorymanagement-images.s3.us-east-1.amazonaws.com/product${Math.floor(Math.random() * 3) + 1
                    }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl h-36 w-36"
                />
                <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                <p className="text-gray-800">{product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">Stock: {product.stockQuantity}</div>
                {product.rating && (
                  <div className="items-center flex mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* MODAL */}
      <CreateProductModal isOpen={isModalOpen} onClose={() => setisModalOpen(false)} onCreate={handleCreateProduct} />
    </div>
  )
}

export default Products