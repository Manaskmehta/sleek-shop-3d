import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { products as allProducts } from "@/data/products";

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
          {allProducts.map((product) => (
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