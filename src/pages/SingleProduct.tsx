import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ArrowLeft, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

// Mock product data - in real app this would come from an API
const productData = {
  "1": {
    id: "1",
    name: "Premium Black Leather Jacket",
    price: 299.99,
    originalPrice: 399.99,
    images: ["/src/assets/leather-jacket.jpg"],
    category: "Outerwear",
    description: "Crafted from the finest Italian leather, this jacket combines timeless style with modern comfort. Perfect for any season.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Brown", "Navy"],
    features: ["100% Genuine Leather", "Italian Craftsmanship", "Modern Fit", "Multiple Pockets"],
    reviews: { average: 4.8, count: 142 }
  },
  "2": {
    id: "2", 
    name: "Essential White T-Shirt",
    price: 49.99,
    originalPrice: undefined,
    images: ["/src/assets/white-tshirt.jpg"],
    category: "Basics",
    description: "The perfect white tee made from premium organic cotton. A wardrobe essential that never goes out of style.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
    features: ["100% Organic Cotton", "Pre-shrunk", "Reinforced Seams", "Comfortable Fit"],
    reviews: { average: 4.9, count: 298 }
  }
};

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToRefs } = useScrollAnimation();
  useParallax();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = productData[id as keyof typeof productData];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-accent transition-smooth"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div 
              ref={addToRefs}
              className="scroll-animate aspect-square bg-gradient-card rounded-2xl overflow-hidden perspective-1000"
            >
              <div className="relative w-full h-full transform-3d hover:rotate-y-12 transition-smooth group">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 filter drop-shadow-2xl"
                />
                
                {/* 3D shadow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 transform translate-y-4 translate-x-4 -z-10 blur-xl group-hover:translate-y-6 group-hover:translate-x-6 transition-smooth"></div>
                
                {/* Discount badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-2 rounded-full font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div ref={addToRefs} className="scroll-animate space-y-4">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {product.category}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.reviews.average) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews.count} reviews)
                  </span>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div ref={addToRefs} className="scroll-animate space-y-3">
              <h3 className="font-semibold">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="transition-smooth hover:scale-105"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div ref={addToRefs} className="scroll-animate space-y-3">
              <h3 className="font-semibold">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                    className="transition-smooth hover:scale-105"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div ref={addToRefs} className="scroll-animate space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`transition-smooth ${isLiked ? 'text-red-500' : ''}`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button variant="premium" size="lg" className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Features */}
            <div ref={addToRefs} className="scroll-animate space-y-3">
              <h3 className="font-semibold">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <div ref={addToRefs} className="scroll-animate grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm">Quality Guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <span className="text-sm">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-yellow-600" />
                <span className="text-sm">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SingleProduct;