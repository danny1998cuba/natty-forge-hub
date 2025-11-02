import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Dumbbell, Target, Award } from "lucide-react";

const workoutPlans = [
  {
    id: 1,
    title: "Natural Hypertrophy Program",
    description: "12-week science-based program for maximum muscle growth",
    level: "Intermediate",
    duration: "12 weeks",
    price: "$49",
    features: ["Progressive overload", "Video demonstrations", "Nutrition guide"],
    icon: TrendingUp
  },
  {
    id: 2,
    title: "Strength Foundation",
    description: "Build a solid foundation with compound movements",
    level: "Beginner",
    duration: "8 weeks",
    price: "$39",
    features: ["Form coaching", "Workout tracking", "Support group"],
    icon: Dumbbell
  },
  {
    id: 3,
    title: "Advanced Athlete Protocol",
    description: "Elite training for experienced natural lifters",
    level: "Advanced",
    duration: "16 weeks",
    price: "$79",
    features: ["Periodization", "1-on-1 consultation", "Custom adjustments"],
    icon: Target
  },
  {
    id: 4,
    title: "Competition Prep",
    description: "Complete prep for natural bodybuilding shows",
    level: "Advanced",
    duration: "20 weeks",
    price: "$149",
    features: ["Peak week protocol", "Posing guide", "Weekly check-ins"],
    icon: Award
  },
];

const Workouts = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="mb-4">Workout Programs</h1>
            <p className="text-xl text-muted-foreground">
              Scientifically designed training programs for natural athletes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {workoutPlans.map((plan) => (
              <Card key={plan.id} className="gradient-card border-border p-6 hover:border-primary transition-smooth group">
                <plan.icon className="h-12 w-12 text-primary mb-4 group-hover:text-secondary transition-smooth" />
                <Badge variant="outline" className="border-secondary text-secondary mb-3">
                  {plan.level}
                </Badge>
                <h3 className="mb-2">{plan.title}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span>⏱️ {plan.duration}</span>
                  <span className="text-2xl font-bold text-primary">{plan.price}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="hero" className="w-full">
                  Get Program
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
