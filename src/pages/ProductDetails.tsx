import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Truck, RefreshCw, Shield } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  // Mock data
  const product = {
    id: id,
    name: "Currently Natty T-Shirt",
    price: "$29.99",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 247,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=1200&q=80",
    ],
    description: "Premium quality cotton t-shirt featuring the Currently Natty logo. Designed for comfort during workouts and casual wear. Made from breathable, moisture-wicking fabric that keeps you cool and dry.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray", "Red"],
    features: [
      "100% premium cotton",
      "Moisture-wicking technology",
      "Reinforced stitching",
      "Tagless design for comfort",
      "Pre-shrunk fabric",
      "Unisex fit"
    ],
    specifications: {
      "Material": "100% Cotton",
      "Weight": "180 GSM",
      "Fit": "Regular/Unisex",
      "Care": "Machine washable",
      "Origin": "Made in USA"
    }
  };

  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button 
            variant="outline" 
            onClick={() => navigate('/store')}
            className="mb-6 border-border hover:border-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Store
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg relative">
                {product.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary z-10">
                    {product.badge}
                  </Badge>
                )}
                <img 
                  src={product.images[currentImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-smooth ${
                      currentImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-secondary">★</span>
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary mb-4">{product.price}</p>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-smooth ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-smooth ${
                        selectedColor === color
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <Button variant="hero" size="lg" className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              {/* Features */}
              <Card className="gradient-card border-border p-6">
                <h3 className="mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Shipping Info */}
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="flex flex-col items-center gap-2">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="h-6 w-6 text-primary" />
                  <span className="text-muted-foreground">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-muted-foreground">Secure Payment</span>
                </div>
              </div>

              {/* Specifications */}
              <Card className="gradient-card border-border p-6">
                <h3 className="mb-4">Specifications</h3>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
