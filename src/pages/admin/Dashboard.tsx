import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Star, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const stats = [
    {
      title: "Total Products",
      value: "24",
      description: "Active products in catalog",
      icon: Package,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Users",
      value: "1,234",
      description: "Registered customers",
      icon: Users,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Average Rating",
      value: "4.8",
      description: "Customer satisfaction",
      icon: Star,
      trend: "+0.2",
      trendUp: true,
    },
    {
      title: "Total Revenue",
      value: "$45,231",
      description: "This month",
      icon: DollarSign,
      trend: "+20%",
      trendUp: true,
    },
    {
      title: "Orders",
      value: "156",
      description: "This month",
      icon: ShoppingCart,
      trend: "+15%",
      trendUp: true,
    },
    {
      title: "Growth",
      value: "23%",
      description: "vs last month",
      icon: TrendingUp,
      trend: "+5%",
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Here's an overview of your store.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className={`flex items-center text-xs mt-2 ${
                  stat.trendUp ? "text-green-600" : "text-red-600"
                }`}>
                  <span>{stat.trend}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions in your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New product added", time: "2 minutes ago", type: "product" },
                { action: "Order #1234 completed", time: "5 minutes ago", type: "order" },
                { action: "New user registered", time: "10 minutes ago", type: "user" },
                { action: "Review submitted", time: "15 minutes ago", type: "review" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common admin tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="font-medium">Add New Product</div>
                <div className="text-sm text-muted-foreground">Create a new product listing</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="font-medium">View Orders</div>
                <div className="text-sm text-muted-foreground">Check recent orders</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="font-medium">Manage Users</div>
                <div className="text-sm text-muted-foreground">View and edit user accounts</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
