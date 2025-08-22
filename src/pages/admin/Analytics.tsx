import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package,
  Star,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

const Analytics = () => {
  // Mock analytics data
  const metrics = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last month"
    },
    {
      title: "Average Order Value",
      value: "$101.25",
      change: "+3.1%",
      trend: "up",
      icon: BarChart3,
      description: "vs last month"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      trend: "up",
      icon: TrendingUp,
      description: "vs last month"
    }
  ];

  const topProducts = [
    { name: "Premium Black Leather Jacket", sales: 156, revenue: "$46,800", growth: "+15%" },
    { name: "Essential White T-Shirt", sales: 234, revenue: "$11,700", growth: "+8%" },
    { name: "Classic Denim Jeans", sales: 89, revenue: "$11,570", growth: "+12%" },
    { name: "Black Leather Sneakers", sales: 123, revenue: "$23,370", growth: "+6%" },
    { name: "Premium Leather Jacket V2", sales: 67, revenue: "$23,450", growth: "+18%" }
  ];

  const recentActivity = [
    { action: "New order placed", time: "2 minutes ago", type: "order", value: "$299.99" },
    { action: "Product review submitted", time: "5 minutes ago", type: "review", value: "5 stars" },
    { action: "New user registered", time: "10 minutes ago", type: "user", value: "johndoe" },
    { action: "Payment received", time: "15 minutes ago", type: "payment", value: "$156.78" },
    { action: "Inventory updated", time: "20 minutes ago", type: "inventory", value: "+25 items" }
  ];

  const salesData = [
    { month: "Jan", revenue: 45000, orders: 320 },
    { month: "Feb", revenue: 52000, orders: 380 },
    { month: "Mar", revenue: 48000, orders: 350 },
    { month: "Apr", revenue: 61000, orders: 420 },
    { month: "May", revenue: 55000, orders: 390 },
    { month: "Jun", revenue: 67000, orders: 450 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of your store performance and insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={metric.trend === "up" ? "default" : "secondary"}
                    className={metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {metric.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {metric.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Data */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales Overview
            </CardTitle>
            <CardDescription>
              Monthly revenue and order trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data) => (
                <div key={data.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 text-sm font-medium">{data.month}</div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 70000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">${data.revenue.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{data.orders} orders</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Top Performing Products
            </CardTitle>
            <CardDescription>
              Best sellers by revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div className="max-w-[200px]">
                      <div className="text-sm font-medium truncate">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.sales} sales</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{product.revenue}</div>
                    <Badge variant="secondary" className="text-xs">
                      {product.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Customer Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Customers</span>
              <span className="text-lg font-bold">+45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Returning Customers</span>
              <span className="text-lg font-bold">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Customer Satisfaction</span>
              <span className="text-lg font-bold">4.8/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Average Session</span>
              <span className="text-lg font-bold">4m 32s</span>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Inventory Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Products</span>
              <span className="text-lg font-bold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Low Stock</span>
              <span className="text-lg font-bold text-yellow-600">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Out of Stock</span>
              <span className="text-lg font-bold text-red-600">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Categories</span>
              <span className="text-lg font-bold">5</span>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Page Load Time</span>
              <span className="text-lg font-bold">1.2s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mobile Traffic</span>
              <span className="text-lg font-bold">62%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bounce Rate</span>
              <span className="text-lg font-bold">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Conversion Rate</span>
              <span className="text-lg font-bold">3.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest actions and events in your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                  <div className="text-sm font-medium mt-1">{activity.value}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
