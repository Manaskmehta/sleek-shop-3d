import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              NOIR
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
            
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </SignedIn>

            {/* Cart */}
            <Button variant="cart" size="icon" className="relative" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              {totalQuantity > 0 && (
                <div className="absolute -top-2 -right-2 h-5 min-w-5 px-1 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary-foreground leading-none">{totalQuantity}</span>
                </div>
              )}
            </Button>

            {/* Login Button */}
            <Button variant="outline" size="default" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Login
            </Button>

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;