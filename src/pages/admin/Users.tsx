import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, Filter, ChevronLeft, ChevronRight, Mail, User, Calendar } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastLogin: string;
  avatar?: string;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    role: "user",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-20",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    role: "user",
    status: "active",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-19",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    username: "mikejohnson",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
    lastLogin: "2024-01-20",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    username: "sarahwilson",
    role: "user",
    status: "inactive",
    joinDate: "2024-01-05",
    lastLogin: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    username: "davidbrown",
    role: "user",
    status: "suspended",
    joinDate: "2023-11-20",
    lastLogin: "2024-01-10",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    username: "emilydavis",
    role: "user",
    status: "active",
    joinDate: "2024-01-12",
    lastLogin: "2024-01-18",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    username: "roberttaylor",
    role: "user",
    status: "active",
    joinDate: "2024-01-08",
    lastLogin: "2024-01-17",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    username: "lisaanderson",
    role: "user",
    status: "active",
    joinDate: "2024-01-03",
    lastLogin: "2024-01-16",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "9",
    name: "James Wilson",
    email: "james.wilson@example.com",
    username: "jameswilson",
    role: "user",
    status: "inactive",
    joinDate: "2023-12-15",
    lastLogin: "2024-01-05",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "10",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    username: "mariagarcia",
    role: "user",
    status: "active",
    joinDate: "2024-01-18",
    lastLogin: "2024-01-20",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "11",
    name: "Thomas Martinez",
    email: "thomas.martinez@example.com",
    username: "thomasmartinez",
    role: "user",
    status: "active",
    joinDate: "2024-01-14",
    lastLogin: "2024-01-19",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "12",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    username: "jenniferlee",
    role: "user",
    status: "active",
    joinDate: "2024-01-16",
    lastLogin: "2024-01-20",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "13",
    name: "Christopher White",
    email: "christopher.white@example.com",
    username: "christopherwhite",
    role: "user",
    status: "active",
    joinDate: "2024-01-11",
    lastLogin: "2024-01-18",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "14",
    name: "Amanda Clark",
    email: "amanda.clark@example.com",
    username: "amandaclark",
    role: "user",
    status: "active",
    joinDate: "2024-01-09",
    lastLogin: "2024-01-17",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "15",
    name: "Daniel Rodriguez",
    email: "daniel.rodriguez@example.com",
    username: "danielrodriguez",
    role: "user",
    status: "active",
    joinDate: "2024-01-07",
    lastLogin: "2024-01-16",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "16",
    name: "Jessica Hall",
    email: "jessica.hall@example.com",
    username: "jessicahall",
    role: "user",
    status: "active",
    joinDate: "2024-01-13",
    lastLogin: "2024-01-19",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "17",
    name: "Matthew Lewis",
    email: "matthew.lewis@example.com",
    username: "matthewlewis",
    role: "user",
    status: "active",
    joinDate: "2024-01-06",
    lastLogin: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "18",
    name: "Nicole Young",
    email: "nicole.young@example.com",
    username: "nicoleyoung",
    role: "user",
    status: "active",
    joinDate: "2024-01-17",
    lastLogin: "2024-01-20",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "19",
    name: "Kevin King",
    email: "kevin.king@example.com",
    username: "kevinking",
    role: "user",
    status: "active",
    joinDate: "2024-01-04",
    lastLogin: "2024-01-14",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "20",
    name: "Rachel Scott",
    email: "rachel.scott@example.com",
    username: "rachelscott",
    role: "user",
    status: "active",
    joinDate: "2024-01-20",
    lastLogin: "2024-01-20",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "21",
    name: "Steven Green",
    email: "steven.green@example.com",
    username: "stevengreen",
    role: "user",
    status: "active",
    joinDate: "2024-01-02",
    lastLogin: "2024-01-13",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "22",
    name: "Laura Baker",
    email: "laura.baker@example.com",
    username: "laurabaker",
    role: "user",
    status: "active",
    joinDate: "2024-01-19",
    lastLogin: "2024-01-20",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const itemsPerPage = 20;
  const roles = ["All", "admin", "user"];
  const statuses = ["All", "active", "inactive", "suspended"];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "All" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
  };

  const handleEditUser = (userData: Omit<User, 'id'>) => {
    if (editingUser) {
      const updatedUser: User = {
        ...userData,
        id: editingUser.id,
      };
      setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "user": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <UserForm 
            onSubmit={handleAddUser}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
            <p className="text-xs text-muted-foreground">
              Administrator accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => new Date(u.joinDate) > new Date('2024-01-01')).length}</div>
            <p className="text-xs text-muted-foreground">
              Joined in January
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
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
                  setSelectedRole("All");
                  setSelectedStatus("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <UserForm 
                          user={user}
                          onSubmit={handleEditUser}
                          onCancel={() => setEditingUser(null)}
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
                            <AlertDialogTitle>Delete User</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{user.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(user.id)}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// User Form Component
interface UserFormProps {
  user?: User;
  onSubmit: (user: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSubmit, onCancel }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    role: user?.role || "user",
    status: user?.status || "active",
    joinDate: user?.joinDate || new Date().toISOString().split('T')[0],
    lastLogin: user?.lastLogin || new Date().toISOString().split('T')[0],
    avatar: user?.avatar || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{user ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogDescription>
          {user ? "Update user information" : "Create a new user account"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value as "admin" | "user"})}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as "active" | "inactive" | "suspended"})}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="joinDate">Join Date</Label>
            <Input
              id="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastLogin">Last Login</Label>
            <Input
              id="lastLogin"
              type="date"
              value={formData.lastLogin}
              onChange={(e) => setFormData({...formData, lastLogin: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="avatar">Avatar URL (Optional)</Label>
          <Input
            id="avatar"
            type="url"
            value={formData.avatar}
            onChange={(e) => setFormData({...formData, avatar: e.target.value})}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {user ? "Update User" : "Add User"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default Users;
