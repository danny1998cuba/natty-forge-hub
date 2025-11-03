import { Link } from "react-router-dom";
import { Flame, Youtube, Instagram, Twitter, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Currently Natty
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Science-backed training for natural athletes. Build muscle, burn fat, achieve your goals naturally.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-full bg-accent flex items-center justify-center hover:bg-primary/20 transition-smooth">
                <Youtube className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-accent flex items-center justify-center hover:bg-primary/20 transition-smooth">
                <Instagram className="h-4 w-4 text-primary" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-accent flex items-center justify-center hover:bg-primary/20 transition-smooth">
                <Twitter className="h-4 w-4 text-primary" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Programs</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/workouts" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Training Plans
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Fitness Tools
                </Link>
              </li>
              <li>
                <Link to="/store" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Merchandise
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/community" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Members Area
                </Link>
              </li>
              <li>
                <Link to="/community/hub" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Forum
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Blog & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Sign In / Sign Up
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Currently Natty. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            contact@currentlynatty.com
          </p>
        </div>
      </div>
    </footer>
  );
};
