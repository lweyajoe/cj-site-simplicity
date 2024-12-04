import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ShoppingCart, Phone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state: cartState } = useCart();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Success",
      description: "You have been logged out successfully.",
    });
    navigate("/login");
  };

  const totalItems = cartState.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="https://cpajoe.co.ke/vendors/images/cpajoe-logo.svg"
                alt="CJs Logo"
                className="h-12"
              />
            </Link>
          </div>

          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button
                className="nav-link flex items-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                Home <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isOpen && (
                <div className="absolute z-10 bg-white shadow-lg rounded-md py-2 w-48">
                  <Link to="/" className="block px-4 py-2 hover:bg-accent">
                    Homepage
                  </Link>
                  <Link to="/about" className="block px-4 py-2 hover:bg-accent">
                    About
                  </Link>
                </div>
              )}
            </div>
            <Link to="/blog" className="nav-link">
              Blog
            </Link>
            <Link to="/services" className="nav-link">
              Services
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/shop" className="nav-link flex items-center">
              Shop
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Shopping Cart</h3>
                  {cartState.items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-2 mb-4">
                        {cartState.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">
                          ${cartState.total.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="flex flex-col gap-2">
                    <Link to="/cart">
                      <Button className="w-full" variant="outline">
                        View Cart
                      </Button>
                    </Link>
                    <Link to="/checkout">
                      <Button className="w-full" variant="secondary">
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
