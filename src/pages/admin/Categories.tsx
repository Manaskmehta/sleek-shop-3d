import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, Filter, Package, Tag } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  status: "active" | "inactive";
  createdAt: string;
  imageUrl?: string;
}

// Mock categories data
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Outerwear",
    slug: "outerwear",
    description: "Jackets, coats, and outer garments for all seasons",
    productCount: 8,
    status: "active",
    createdAt: "2024-01-01",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=150&h=150&fit=crop"
  },
  {
    id: "2",
    name: "Basics",
    slug: "basics",
    description: "Essential clothing items for everyday wear",
    productCount: 12,
    status: "active",
    createdAt: "2024-01-01",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop"
  },
  {
    id: "3",
    name: "Denim",
    slug: "denim",
    description: "Jeans and denim clothing in various styles",
    productCount: 6,
    status: "active",
    createdAt: "2024-01-01",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop"
  },
  {
    id: "4",
    name: "Footwear",
    slug: "footwear",
    description: "Shoes, sneakers, and boots for all occasions",
    productCount: 10,
    status: "active",
    createdAt: "2024-01-01",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop"
  },
  {
    id: "5",
    name: "Accessories",
    slug: "accessories",
    description: "Belts, bags, and other fashion accessories",
    productCount: 15,
    status: "inactive",
    createdAt: "2024-01-01",
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=150&h=150&fit=crop"
  }
];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const statuses = ["All", "active", "inactive"];

  // Initialize categories from localStorage on component mount
  useEffect(() => {
    const storedCategories = localStorage.getItem('adminCategories');
    if (storedCategories) {
      try {
        const parsed = JSON.parse(storedCategories);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge stored categories with mock data, avoiding duplicates
          const existingIds = new Set(categories.map(c => c.id));
          const newCategories = parsed.filter((c: any) => !existingIds.has(c.id));
          if (newCategories.length > 0) {
            setCategories([...categories, ...newCategories]);
          }
        }
      } catch (error) {
        console.error('Error parsing stored categories:', error);
      }
    }
  }, []);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || category.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'productCount'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      productCount: 0,
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    
    // Save to localStorage for use in other admin pages
    localStorage.setItem('adminCategories', JSON.stringify(updatedCategories.filter(c => c.status === 'active')));
    
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = (categoryData: Omit<Category, 'id' | 'createdAt' | 'productCount'>) => {
    if (editingCategory) {
      const updatedCategory: Category = {
        ...categoryData,
        id: editingCategory.id,
        createdAt: editingCategory.createdAt,
        productCount: editingCategory.productCount,
      };
      const updatedCategories = categories.map(c => c.id === editingCategory.id ? updatedCategory : c);
      setCategories(updatedCategories);
      
      // Save to localStorage for use in other admin pages
      localStorage.setItem('adminCategories', JSON.stringify(updatedCategories.filter(c => c.status === 'active')));
      
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(c => c.id !== categoryId);
    setCategories(updatedCategories);
    
    // Save to localStorage for use in other admin pages
    localStorage.setItem('adminCategories', JSON.stringify(updatedCategories.filter(c => c.status === 'active')));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories Management</h1>
          <p className="text-muted-foreground">
            Organize your products with custom categories
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <CategoryForm 
            onSubmit={handleAddCategory}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              All product categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter(c => c.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.reduce((acc, c) => acc + c.productCount, 0)}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Products/Category</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(categories.reduce((acc, c) => acc + c.productCount, 0) / categories.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per category
            </p>
          </CardContent>
        </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>Categories ({filteredCategories.length})</CardTitle>
          <CardDescription>
            Manage your product categories and organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {category.imageUrl && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-muted-foreground">/{category.slug}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px]">
                      <p className="text-sm line-clamp-2">{category.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {category.productCount} products
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(category.status)}>
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingCategory(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <CategoryForm 
                          category={category}
                          onSubmit={handleEditCategory}
                          onCancel={() => setEditingCategory(null)}
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
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{category.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCategory(category.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Category Form Component
interface CategoryFormProps {
  category?: Category;
  onSubmit: (category: Omit<Category, 'id' | 'createdAt' | 'productCount'>) => void;
  onCancel: () => void;
}

const CategoryForm = ({ category, onSubmit, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    status: category?.status || "active",
    imageUrl: category?.imageUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
        <DialogDescription>
          {category ? "Update category information" : "Create a new product category"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              required
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
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as "active" | "inactive"})}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {category ? "Update Category" : "Add Category"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default Categories;
