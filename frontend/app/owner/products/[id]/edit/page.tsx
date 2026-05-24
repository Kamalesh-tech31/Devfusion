"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getProducts, saveProducts, Product } from "@/lib/dashboardData";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const products = getProducts();
    const existing = products.find((item) => item.id === Number(id));

    if (!existing) {
      router.push("/owner/products");
      return;
    }

    setProduct(existing);
    setName(existing.name);
    setSku(existing.sku);
    setPrice(existing.price);
    setStock(existing.stock);
    setImage(existing.image);
  }, [id, router]);

  function statusFromStock(value: number) {
    if (value <= 0) return "Out of Stock";
    if (value <= 5) return "Low Stock";
    return "In Stock";
  }

  function handleSave() {
    if (!product) return;

    const products = getProducts();
    const updatedProducts = products.map((item) =>
      item.id === product.id
        ? {
            ...item,
            name: name.trim() || item.name,
            sku: sku.trim() || item.sku,
            price: price.trim() || item.price,
            stock,
            status: statusFromStock(stock),
            image: image.trim() || item.image,
          }
        : item,
    );

    saveProducts(updatedProducts);
    router.push("/owner/products");
  }

  if (!product) {
    return (
      <div className="p-8 text-white">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Edit Product</h1>

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
