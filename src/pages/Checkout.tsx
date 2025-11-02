import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CreditCard, Lock } from "lucide-react";
import { useState } from "react";

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Currently Natty T-Shirt",
      price: 29.99,
      quantity: 2,
      size: "M",
      color: "Black",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80"
    },
    {
      id: 2,
      name: "Natural Hypertrophy Program",
      price: 49.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&q=80"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Payment processing would go here
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="mb-2">Checkout</h1>
              <p className="text-muted-foreground">Complete your purchase securely</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card className="gradient-card border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="border-border bg-background"
                        required
                      />
                    </div>
                  </div>
                </Card>

                {/* Shipping Information */}
                <Card className="gradient-card border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          className="border-border bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          className="border-border bg-background"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Street address"
                        className="border-border bg-background"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          type="text"
                          className="border-border bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          type="text"
                          className="border-border bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          type="text"
                          className="border-border bg-background"
                          required
                        />
                      </div>
                    </div>
                  </form>
                </Card>

                {/* Payment Information */}
                <Card className="gradient-card border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Payment Details</h2>
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="border-border bg-background"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          type="text"
                          placeholder="MM / YY"
                          className="border-border bg-background"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          type="text"
                          placeholder="123"
                          className="border-border bg-background"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <Lock className="h-4 w-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </form>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="gradient-card border-border p-6 sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          {item.size && item.color && (
                            <p className="text-xs text-muted-foreground">
                              {item.size} • {item.color}
                            </p>
                          )}
                          <p className="text-sm">
                            <span className="text-muted-foreground">Qty: {item.quantity}</span>
                            <span className="float-right font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Promo code"
                        className="border-border bg-background"
                      />
                      <Button variant="outline" className="border-border hover:border-primary">
                        Apply
                      </Button>
                    </div>
                  </div>

                  {/* Complete Order Button */}
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isProcessing}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    {isProcessing ? "Processing..." : "Complete Order"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By completing this order, you agree to our Terms of Service
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
