"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getProducts,
  nextId,
  Product,
  saveProducts,
} from "@/lib/dashboardData";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1580894908361-967195033215";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(DEFAULT_IMAGE);

  function statusFromStock(value: number) {
    if (value <= 0) return "Out of Stock";
    if (value <= 5) return "Low Stock";
    return "In Stock";
  }

  function handleSave() {
    const products = getProducts();
    const newProduct: Product = {
      id: nextId(products),
      name: name.trim() || "New Product",
      sku: sku.trim() || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      price: price.trim() || "$0",
      stock,
      status: statusFromStock(stock),
      image: image.trim() || DEFAULT_IMAGE,
    };

    saveProducts([...products, newProduct]);
    router.push("/owner/products");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Add Product</h1>

      <div className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl pl-4 pr-4 py-3 text-white outline-none"
        />
        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl pl-4 pr-4 py-3 text-white outline-none"
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl pl-4 pr-4 py-3 text-white outline-none"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl pl-4 pr-4 py-3 text-white outline-none"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl pl-4 pr-4 py-3 text-white outline-none"
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#7F1D1D] rounded-2xl text-white"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-neutral-800 rounded-2xl text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
