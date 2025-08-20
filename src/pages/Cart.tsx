import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, subtotal, totalQuantity, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Link to="/products">
              <Button variant="default">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}`} className="flex items-center gap-4 border rounded-xl p-4 bg-card">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded-md bg-background" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        {(item.size || item.color) && (
                          <p className="text-xs text-muted-foreground mt-1">{item.size ? `Size: ${item.size}` : ""}{item.size && item.color ? " • " : ""}{item.color ? `Color: ${item.color}` : ""}</p>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, item.size, item.color)}>
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border rounded-lg">
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4">{item.quantity}</span>
                        <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
              </div>
            </div>

            <div className="border rounded-xl p-6 h-fit bg-card">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Items</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-4">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={() => navigate("/checkout")}>Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;


