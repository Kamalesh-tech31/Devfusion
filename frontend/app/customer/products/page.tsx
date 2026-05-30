"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/mock-data"
import { fetchProducts } from "@/lib/api"
import { Search, Filter, ShoppingCart, Heart } from "lucide-react"

const categories = ["All", "Audio", "Accessories", "Wearables", "Storage"]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const productsData = await fetchProducts()
        setProducts(productsData)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load products")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse our collection of premium electronics and accessories
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="h-8"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-16">
            <p className="text-sm text-muted-foreground">Loading products...</p>
          </div>
        ) : error ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <p className="text-lg font-medium text-foreground">Unable to load products</p>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-none shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden bg-zinc-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    aria-label="Add product to favorites"
                    className="absolute right-3 top-3 rounded-full bg-white/90 p-2 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4 text-foreground" />
                  </button>
                  <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                    {product.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Premium quality product</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-foreground">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <Button size="sm" className="gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-foreground">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
