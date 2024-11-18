import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ShoppingCart, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link
              to="/shop"
              className="nav-link flex items-center"
            >
              <ShoppingCart className="mr-1 h-4 w-4" />
              Shop
            </Link>
            <Link
              to="/contact"
              className="nav-link flex items-center"
            >
              <Phone className="mr-1 h-4 w-4" />
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;