import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, Filter, Star, User, Package } from "lucide-react";

interface Review {
  id: string;
  productName: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
  userAvatar?: string;
}

// Mock review data
const mockReviews: Review[] = [
  {
    id: "1",
    productName: "Premium Black Leather Jacket",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    rating: 5,
    comment: "Excellent quality leather jacket. Fits perfectly and looks amazing!",
    status: "approved",
    createdAt: "2024-01-20",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2",
    productName: "Essential White T-Shirt",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    rating: 4,
    comment: "Great basic tee, very comfortable and good quality fabric.",
    status: "approved",
    createdAt: "2024-01-19",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    productName: "Classic Denim Jeans",
    userName: "Mike Johnson",
    userEmail: "mike.johnson@example.com",
    rating: 3,
    comment: "Good jeans but the sizing runs a bit small. Consider ordering up.",
    status: "pending",
    createdAt: "2024-01-18",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "4",
    productName: "Black Leather Sneakers",
    userName: "Sarah Wilson",
    userEmail: "sarah.wilson@example.com",
    rating: 5,
    comment: "Love these sneakers! They're stylish and comfortable for daily wear.",
    status: "approved",
    createdAt: "2024-01-17",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "5",
    productName: "Premium Leather Jacket V2",
    userName: "David Brown",
    userEmail: "david.brown@example.com",
    rating: 2,
    comment: "The jacket arrived with a small defect. Customer service was helpful though.",
    status: "rejected",
    createdAt: "2024-01-16",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const statuses = ["All", "approved", "pending", "rejected"];
  const ratings = ["All", "1", "2", "3", "4", "5"];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || review.status === selectedStatus;
    const matchesRating = selectedStatus === "All" || review.rating.toString() === selectedRating;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleAddReview = (reviewData: Omit<Review, 'id'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
    };
    setReviews([...reviews, newReview]);
    setIsAddDialogOpen(false);
  };

  const handleEditReview = (reviewData: Omit<Review, 'id'>) => {
    if (editingReview) {
      const updatedReview: Review = {
        ...reviewData,
        id: editingReview.id,
      };
      setReviews(reviews.map(r => r.id === editingReview.id ? updatedReview : r));
      setEditingReview(null);
    }
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  const handleStatusChange = (reviewId: string, newStatus: "approved" | "pending" | "rejected") => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews Management</h1>
          <p className="text-muted-foreground">
            Manage product reviews and customer feedback
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Review
            </Button>
          </DialogTrigger>
          <ReviewForm 
            onSubmit={handleAddReview}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
            <p className="text-xs text-muted-foreground">
              All customer reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.filter(r => r.status === 'approved').length}</div>
            <p className="text-xs text-muted-foreground">
              Published reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.filter(r => r.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Overall rating
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search reviews..."
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
            <div>
              <Label htmlFor="rating">Rating</Label>
              <select
                id="rating"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating === "All" ? "All Ratings" : `${rating} Stars`}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus("All");
                  setSelectedRating("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews ({filteredReviews.length})</CardTitle>
          <CardDescription>
            Manage customer reviews and feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={review.userAvatar} />
                        <AvatarFallback>{review.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-sm text-muted-foreground">{review.userEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="max-w-[200px] truncate">{review.productName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-muted-foreground">({review.rating})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px]">
                      <p className="text-sm line-clamp-2">{review.comment}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <select
                      value={review.status}
                      onChange={(e) => handleStatusChange(review.id, e.target.value as "approved" | "pending" | "rejected")}
                      className={`px-2 py-1 rounded text-xs font-medium border-0 ${getStatusColor(review.status)}`}
                    >
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                  <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingReview(review)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <ReviewForm 
                          review={review}
                          onSubmit={handleEditReview}
                          onCancel={() => setEditingReview(null)}
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
                            <AlertDialogTitle>Delete Review</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this review? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteReview(review.id)}
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

// Review Form Component
interface ReviewFormProps {
  review?: Review;
  onSubmit: (review: Omit<Review, 'id'>) => void;
  onCancel: () => void;
}

const ReviewForm = ({ review, onSubmit, onCancel }: ReviewFormProps) => {
  const [formData, setFormData] = useState({
    productName: review?.productName || "",
    userName: review?.userName || "",
    userEmail: review?.userEmail || "",
    rating: review?.rating || 5,
    comment: review?.comment || "",
    status: review?.status || "pending",
    createdAt: review?.createdAt || new Date().toISOString().split('T')[0],
    userAvatar: review?.userAvatar || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{review ? "Edit Review" : "Add New Review"}</DialogTitle>
        <DialogDescription>
          {review ? "Update review information" : "Create a new review"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) => setFormData({...formData, productName: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <select
              id="rating"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
            >
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>{rating} Stars</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="userName">User Name</Label>
            <Input
              id="userName"
              value={formData.userName}
              onChange={(e) => setFormData({...formData, userName: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="userEmail">User Email</Label>
            <Input
              id="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="comment">Review Comment</Label>
          <Textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            required
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as "approved" | "pending" | "rejected"})}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <Label htmlFor="createdAt">Review Date</Label>
            <Input
              id="createdAt"
              type="date"
              value={formData.createdAt}
              onChange={(e) => setFormData({...formData, createdAt: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="userAvatar">User Avatar URL (Optional)</Label>
          <Input
            id="userAvatar"
            type="url"
            value={formData.userAvatar}
            onChange={(e) => setFormData({...formData, userAvatar: e.target.value})}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {review ? "Update Review" : "Add Review"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default Reviews;
