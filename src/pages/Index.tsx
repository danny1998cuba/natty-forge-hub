import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Flame, Users, TrendingUp, Zap, Youtube, Target, Award, CheckCircle } from "lucide-react";
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

      {/* Brand Mission Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Our Mission</Badge>
            <h2 className="mb-6 text-primary">Natural Bodybuilding, Honest Content</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Currently Natty is dedicated to providing evidence-based training programs and authentic fitness content 
              for natural athletes. No shortcuts, no BS - just science-backed methods that deliver real, sustainable results.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-primary">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-2">Science-Based</h3>
                <p className="text-muted-foreground text-center">Every program backed by research and proven methods</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl mb-2">100% Natural</h3>
                <p className="text-muted-foreground text-center">Honest approach to natural bodybuilding and fitness</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl mb-2">Proven Results</h3>
                <p className="text-muted-foreground text-center">Thousands of natural athletes achieving their goals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement - After Mission */}
      <div className="container mx-auto px-4 py-6">
        <AdPlaceholder size="banner" className="mx-auto" />
      </div>

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

      {/* Stats Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "YouTube Subscribers" },
              { number: "10K+", label: "Active Members" },
              { number: "100+", label: "Training Programs" },
              { number: "500+", label: "Success Stories" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Preview Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Youtube className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-primary">Latest From The Channel</h2>
            </div>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Check out our latest videos covering training techniques, nutrition advice, and natural bodybuilding tips
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((item) => (
                <Card key={item} className="gradient-card overflow-hidden border-border hover:border-primary transition-smooth group cursor-pointer">
                  <div className="aspect-video bg-muted relative flex items-center justify-center">
                    <Youtube className="h-16 w-16 text-primary/50 group-hover:text-primary transition-smooth" />
                  </div>
                  <div className="p-6">
                    <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">New Video</Badge>
                    <h3 className="text-xl mb-2 group-hover:text-primary transition-smooth">
                      Natural Bodybuilding Training Tips
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Learn the essential techniques for maximizing muscle growth naturally
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                View All Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement - Before Testimonials */}
      <div className="container mx-auto px-4 py-6">
        <AdPlaceholder size="banner" className="mx-auto" />
      </div>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-primary">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Mike Johnson",
                result: "Lost 30lbs, Gained Muscle",
                quote: "The natural approach changed my life. No gimmicks, just real science and dedication."
              },
              {
                name: "Sarah Chen",
                result: "Transformed in 12 Months",
                quote: "Finally found a community that understands natural bodybuilding. The programs actually work!"
              },
              {
                name: "David Martinez",
                result: "Broke Through Plateau",
                quote: "After years of spinning my wheels, these science-based methods helped me make real progress."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="gradient-card p-6 border-border">
                <div className="mb-4">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="h-4 w-4 text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary">{testimonial.result}</p>
                </div>
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
