import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { products as initialProducts, Product } from "@/data/products";

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Get categories from localStorage or use defaults
  const getCategories = () => {
    const storedCategories = localStorage.getItem('adminCategories');
    if (storedCategories) {
      const parsed = JSON.parse(storedCategories);
      return ["All", ...parsed.map((c: any) => c.name)];
    }
    return ["All", "Outerwear", "Basics", "Denim", "Footwear"];
  };
  
  const [categories, setCategories] = useState(getCategories());

  // Update categories when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setCategories(getCategories());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      images: [productData.images[0]], // For simplicity, just use first image
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      const updatedProduct: Product = {
        ...productData,
        id: editingProduct.id,
        images: [productData.images[0]], // For simplicity, just use first image
      };
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <ProductForm 
            onSubmit={handleAddProduct}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <ProductForm 
                      product={product}
                      onSubmit={handleEditProduct}
                      onCancel={() => setEditingProduct(null)}
                    />
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{product.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {product.description.substring(0, 100)}...
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span>Rating: {product.reviews.average}</span>
                <span className="text-muted-foreground">({product.reviews.count} reviews)</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Product Form Component
interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    category: product?.category || "Basics",
    description: product?.description || "",
    sizes: product?.sizes || [],
    colors: product?.colors || [],
    features: product?.features || [],
    images: product?.images || [""],
  });

  // Get categories from localStorage or use defaults
  const getFormCategories = () => {
    const storedCategories = localStorage.getItem('adminCategories');
    if (storedCategories) {
      const parsed = JSON.parse(storedCategories);
      return parsed.map((c: any) => c.name);
    }
    return ["Outerwear", "Basics", "Denim", "Footwear"];
  };
  
  const [formCategories, setFormCategories] = useState(getFormCategories());

  // Update form categories when localStorage changes
  useEffect(() => {
    setFormCategories(getFormCategories());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogDescription>
          {product ? "Update product information" : "Create a new product listing"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
            >
              {formCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              required
            />
          </div>
          <div>
            <Label htmlFor="originalPrice">Original Price (Optional)</Label>
            <Input
              id="originalPrice"
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value)})}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="url"
            value={formData.images[0]}
            onChange={(e) => setFormData({...formData, images: [e.target.value]})}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {product ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default Products;
