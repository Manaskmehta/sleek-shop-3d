import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, originalPrice, image, category }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <div 
      className="group relative bg-card rounded-xl p-4 shadow-subtle hover:shadow-3d transition-smooth transform hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gradient-card">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 transition-all duration-300 ease-out group-hover:scale-110"
        />
        
        {/* Discount badge */}
        {originalPrice && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-semibold">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Like button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 h-8 w-8 transition-smooth ${
            isLiked ? "text-red-500" : "text-muted-foreground hover:text-foreground"
          } ${isHovered ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        </Button>


      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {category}
        </div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-foreground">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex text-yellow-400">
            {"★".repeat(5)}
          </div>
          <span className="text-xs text-muted-foreground">(4.8)</span>
        </div>
      </div>

      {/* 3D hover effect */}
      <div className={`absolute inset-0 pointer-events-none transition-smooth ${
        isHovered ? "transform translate-z-2" : ""
      }`}></div>
    </div>
  );
};

export default ProductCard;