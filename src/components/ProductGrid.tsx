import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import headphones from "@/assets/headphones.jpg";
import smartwatch from "@/assets/smartwatch.jpg";
import smartphone from "@/assets/smartphone.jpg";
import laptop from "@/assets/laptop.jpg";

const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    image: headphones,
    category: "Audio"
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    price: 399.99,
    image: smartwatch,
    category: "Wearables"
  },
  {
    id: "3",
    name: "Smartphone Ultra",
    price: 899.99,
    originalPrice: 999.99,
    image: smartphone,
    category: "Mobile"
  },
  {
    id: "4",
    name: "Ultra Laptop",
    price: 1299.99,
    image: laptop,
    category: "Computing"
  },
  {
    id: "5",
    name: "Premium Wireless Headphones V2",
    price: 299.99,
    image: headphones,
    category: "Audio"
  },
  {
    id: "6",
    name: "Smart Watch Elite",
    price: 599.99,
    originalPrice: 699.99,
    image: smartwatch,
    category: "Wearables"
  },
  {
    id: "7",
    name: "Smartphone Pro Max",
    price: 1199.99,
    image: smartphone,
    category: "Mobile"
  },
  {
    id: "8",
    name: "Gaming Laptop Pro",
    price: 1999.99,
    originalPrice: 2299.99,
    image: laptop,
    category: "Computing"
  }
];

const ProductGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium electronics and accessories
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Audio", "Wearables", "Mobile", "Computing"].map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="transition-smooth"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="min-w-[200px]">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;