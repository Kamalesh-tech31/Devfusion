"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/mock-data"
import Link from "next/link"

export function FeaturedProducts() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Featured Products</h2>
        <Link href="/customer/products" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden border-none shadow-sm">
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden bg-zinc-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground">{product.category}</p>
                <h3 className="mt-1 font-medium text-foreground">{product.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <Button size="sm" className="h-8 text-xs">
                    Add To Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
