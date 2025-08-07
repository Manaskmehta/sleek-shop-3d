import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import leatherJacket from "@/assets/leather-jacket.jpg";
import whiteTshirt from "@/assets/white-tshirt.jpg";
import denimJeans from "@/assets/denim-jeans.jpg";
import blackSneakers from "@/assets/black-sneakers.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const products = [
  {
    id: "1",
    name: "Premium Black Leather Jacket",
    price: 299.99,
    originalPrice: 399.99,
    image: leatherJacket,
    category: "Outerwear"
  },
  {
    id: "2",
    name: "Essential White T-Shirt",
    price: 49.99,
    image: whiteTshirt,
    category: "Basics"
  },
  {
    id: "3",
    name: "Classic Denim Jeans",
    price: 129.99,
    originalPrice: 159.99,
    image: denimJeans,
    category: "Denim"
  },
  {
    id: "4",
    name: "Black Leather Sneakers",
    price: 189.99,
    image: blackSneakers,
    category: "Footwear"
  },
  {
    id: "5",
    name: "Premium Leather Jacket V2",
    price: 349.99,
    image: leatherJacket,
    category: "Outerwear"
  },
  {
    id: "6",
    name: "Vintage White Tee",
    price: 59.99,
    originalPrice: 79.99,
    image: whiteTshirt,
    category: "Basics"
  },
  {
    id: "7",
    name: "Raw Denim Jeans",
    price: 179.99,
    image: denimJeans,
    category: "Denim"
  },
  {
    id: "8",
    name: "Premium Black Sneakers",
    price: 249.99,
    originalPrice: 299.99,
    image: blackSneakers,
    category: "Footwear"
  }
];

const ProductGrid = () => {
  const { addToRefs } = useScrollAnimation();
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={addToRefs} className="scroll-animate text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium fashion pieces and accessories
          </p>
        </div>

        {/* Category Filter */}
        <div ref={addToRefs} className="scroll-animate flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Outerwear", "Basics", "Denim", "Footwear"].map((category) => (
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
        <div ref={addToRefs} className="scroll-animate grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
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