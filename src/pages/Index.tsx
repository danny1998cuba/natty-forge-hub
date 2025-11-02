import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Users, TrendingUp, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Currently Natty Fitness" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Currently Natty
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your ultimate destination for natural bodybuilding, science-backed training, and authentic fitness content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              Watch Latest Video
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-primary">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Flame,
                title: "Elite Programs",
                description: "Science-backed workout plans designed for natural athletes"
              },
              {
                icon: Users,
                title: "Community",
                description: "Connect with like-minded fitness enthusiasts"
              },
              {
                icon: TrendingUp,
                title: "Track Progress",
                description: "Powerful tools to monitor your transformation"
              },
              {
                icon: Zap,
                title: "Premium Content",
                description: "Exclusive videos, articles, and training insights"
              }
            ].map((feature, index) => (
              <Card key={index} className="gradient-card p-6 border-border hover:border-primary transition-smooth group">
                <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:text-secondary transition-smooth" />
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Ready to Transform?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of natural athletes achieving their fitness goals
          </p>
          <Button variant="hero" size="lg">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
