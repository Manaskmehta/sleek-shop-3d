import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Users, 
  Star, 
  Settings, 
  BarChart3, 
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Tag
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

          const menuItems = [
          { icon: LayoutDashboard, label: "Dashboard", path: "/adminismanas/dashboard" },
          { icon: Package, label: "Products", path: "/adminismanas/products" },
          { icon: Tag, label: "Categories", path: "/adminismanas/categories" },
          { icon: Users, label: "Users", path: "/adminismanas/users" },
          { icon: Star, label: "Reviews", path: "/adminismanas/reviews" },
          { icon: BarChart3, label: "Analytics", path: "/adminismanas/analytics" },
          { icon: Settings, label: "Settings", path: "/adminismanas/settings" },
        ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/adminismanas/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Separator className="my-6" />

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, Admin
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
