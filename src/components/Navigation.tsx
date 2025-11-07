import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Dumbbell, User } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Workouts", path: "/workouts" },
  { name: "Store", path: "/store" },
  { name: "Community", path: "/community" },
  { name: "Tools", path: "/tools" },
  { name: "Contact", path: "/contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Dumbbell className="h-8 w-8 text-primary group-hover:text-secondary transition-smooth" />
            <span className="text-xl font-bold">Currently Natty</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/profile">
                <User className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="hero" size="sm" onClick={() => window.location.href = '/plans'}>
              Join Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium transition-smooth hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-medium transition-smooth hover:text-primary text-muted-foreground"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Button variant="hero" size="sm" className="w-full" onClick={() => window.location.href = '/plans'}>
              Join Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
