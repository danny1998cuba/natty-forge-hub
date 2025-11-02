import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Currently Natty T-Shirt",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Performance Tank Top",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80",
    badge: "New"
  },
  {
    id: 3,
    name: "Training Hoodie",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    badge: ""
  },
  {
    id: 4,
    name: "Gym Bag",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80",
    badge: ""
  },
  {
    id: 5,
    name: "Resistance Bands Set",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80",
    badge: "Hot"
  },
  {
    id: 6,
    name: "Workout Journal",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    badge: ""
  },
];

const Store = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="mb-4">Merchandise Store</h1>
            <p className="text-xl text-muted-foreground">
              Premium fitness gear and Currently Natty apparel
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="gradient-card border-border overflow-hidden hover:border-primary transition-smooth group cursor-pointer"
                onClick={() => navigate(`/store/${product.id}`)}
              >
                <div className="aspect-square overflow-hidden relative">
                  {product.badge && (
                    <Badge className="absolute top-3 right-3 bg-primary z-10">
                      {product.badge}
                    </Badge>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                    <Button size="sm" variant="hero">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
