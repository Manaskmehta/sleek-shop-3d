import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import SingleProduct from "./pages/SingleProduct";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Account from "./pages/Account";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminUsers from "./pages/admin/Users";
import AdminReviews from "./pages/admin/Reviews";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import AdminCategories from "./pages/admin/Categories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          
          {/* Admin Routes */}
          <Route path="/adminismanas/login" element={<AdminLogin />} />
          <Route path="/adminismanas" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route index element={<Dashboard />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
