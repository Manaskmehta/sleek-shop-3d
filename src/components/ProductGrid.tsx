import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { products as allProducts } from "@/data/products";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const { addToRefs } = useScrollAnimation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return allProducts;
    }
    return allProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);
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
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="transition-smooth"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div ref={addToRefs} className="scroll-animate grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.images[0]}
              category={product.category}
            />
          ))}
        </div>

        {/* See All Products */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="min-w-[200px]"
            onClick={() => navigate('/products')}
          >
            See all products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;