import leatherJacket from "@/assets/leather-jacket.jpg";
import whiteTshirt from "@/assets/white-tshirt.jpg";
import denimJeans from "@/assets/denim-jeans.jpg";
import blackSneakers from "@/assets/black-sneakers.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  features: string[];
  reviews: { average: number; count: number };
};

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Black Leather Jacket",
    price: 299.99,
    originalPrice: 399.99,
    images: [leatherJacket, leatherJacket, leatherJacket],
    category: "Outerwear",
    description:
      "Crafted from the finest Italian leather, this jacket combines timeless style with modern comfort. Perfect for any season.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Brown", "Navy"],
    features: ["100% Genuine Leather", "Italian Craftsmanship", "Modern Fit", "Multiple Pockets"],
    reviews: { average: 4.8, count: 142 },
  },
  {
    id: "2",
    name: "Essential White T-Shirt",
    price: 49.99,
    images: [whiteTshirt, whiteTshirt, whiteTshirt],
    category: "Basics",
    description:
      "The perfect white tee made from premium organic cotton. A wardrobe essential that never goes out of style.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
    features: ["100% Organic Cotton", "Pre-shrunk", "Reinforced Seams", "Comfortable Fit"],
    reviews: { average: 4.9, count: 298 },
  },
  {
    id: "3",
    name: "Classic Denim Jeans",
    price: 129.99,
    originalPrice: 159.99,
    images: [denimJeans, denimJeans, denimJeans],
    category: "Denim",
    description:
      "Classic straight-fit denim with a premium wash and durable construction for everyday wear.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Indigo", "Light Blue", "Black"],
    features: ["Premium Wash", "Reinforced Stitching", "Comfort Stretch", "Classic Fit"],
    reviews: { average: 4.6, count: 87 },
  },
  {
    id: "4",
    name: "Black Leather Sneakers",
    price: 189.99,
    images: [blackSneakers, blackSneakers, blackSneakers],
    category: "Footwear",
    description:
      "Minimal black leather sneakers designed for comfort and style. Perfect for casual and smart-casual looks.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black"],
    features: ["Full-Grain Leather", "Cushioned Insole", "Anti-slip Sole"],
    reviews: { average: 4.7, count: 121 },
  },
  {
    id: "5",
    name: "Premium Leather Jacket V2",
    price: 349.99,
    images: [leatherJacket, leatherJacket, leatherJacket],
    category: "Outerwear",
    description:
      "An elevated take on the classic leather jacket with refined details and a tailored fit.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Olive"],
    features: ["Premium Zippers", "Tailored Fit", "Soft Lining"],
    reviews: { average: 4.5, count: 64 },
  },
  {
    id: "6",
    name: "Vintage White Tee",
    price: 59.99,
    originalPrice: 79.99,
    images: [whiteTshirt, whiteTshirt, whiteTshirt],
    category: "Basics",
    description:
      "Vintage-inspired white tee with a broken-in feel and subtle texture.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Ecru"],
    features: ["Vintage Wash", "Soft Handfeel", "Relaxed Fit"],
    reviews: { average: 4.4, count: 53 },
  },
  {
    id: "7",
    name: "Raw Denim Jeans",
    price: 179.99,
    images: [denimJeans, denimJeans, denimJeans],
    category: "Denim",
    description:
      "Unwashed raw denim that molds to your body over time for a personalized fit.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Raw Indigo"],
    features: ["Selvedge Edge", "Heavyweight Denim", "Durable Construction"],
    reviews: { average: 4.3, count: 45 },
  },
  {
    id: "8",
    name: "Premium Black Sneakers",
    price: 249.99,
    originalPrice: 299.99,
    images: [blackSneakers, blackSneakers, blackSneakers],
    category: "Footwear",
    description:
      "Luxurious black sneakers with premium materials and a sleek silhouette.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Charcoal"],
    features: ["Premium Leather", "Memory Foam Insole", "Lightweight"],
    reviews: { average: 4.7, count: 98 },
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);


