import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Access to public blog posts",
      "Basic workout library",
      "Community forum access",
      "Weekly newsletter",
    ],
    recommended: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For serious natural athletes",
    features: [
      "All free features",
      "Full blog access",
      "All workout programs",
      "Nutrition calculator tools",
      "Priority support",
      "Exclusive member content",
      "Monthly live Q&A sessions",
    ],
    recommended: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: "$79",
    period: "per month",
    description: "Maximum results with personal coaching",
    features: [
      "All pro features",
      "1-on-1 coaching calls",
      "Custom meal plans",
      "Custom workout programming",
      "Weekly progress reviews",
      "24/7 priority support",
      "Private Discord channel",
      "Competition prep guidance",
    ],
    recommended: false,
  },
];

const MembershipPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground">
              Join thousands of natural athletes transforming their bodies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`gradient-card border-border p-6 relative ${
                  plan.recommended ? "border-primary shadow-elegant scale-105" : ""
                }`}
              >
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.recommended ? "hero" : "outline"} 
                  className={!plan.recommended ? "border-primary text-primary hover:bg-primary/10 w-full" : "w-full"}
                  onClick={() => navigate("/auth")}
                >
                  {plan.id === "free" ? "Get Started" : "Start Trial"}
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              All paid plans include a 7-day free trial. Cancel anytime.
            </p>
          </div>

          {/* Comparison Table Section */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Compare All Features</h2>
              <p className="text-lg text-muted-foreground">
                See exactly what's included in each plan
              </p>
            </div>

            <div className="gradient-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead className="w-[300px] text-foreground font-semibold">Features</TableHead>
                      <TableHead className="text-center text-foreground font-semibold">Free</TableHead>
                      <TableHead className="text-center text-foreground font-semibold">
                        <div className="flex items-center justify-center gap-2">
                          Pro
                          <Badge className="bg-primary text-primary-foreground text-xs">Popular</Badge>
                        </div>
                      </TableHead>
                      <TableHead className="text-center text-foreground font-semibold">Elite</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Basic Access Category */}
                    <TableRow className="bg-primary/10 hover:bg-primary/10">
                      <TableCell colSpan={4} className="font-bold text-primary text-sm uppercase tracking-wide py-3">
                        Basic Access
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Access to public blog posts</TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Basic workout library</TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Community forum access</TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Weekly newsletter</TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>

                    {/* Content & Training Category */}
                    <TableRow className="bg-primary/10 hover:bg-primary/10">
                      <TableCell colSpan={4} className="font-bold text-primary text-sm uppercase tracking-wide py-3">
                        Content & Training
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Full blog access</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">All workout programs</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Exclusive member content</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>

                    {/* Tools & Resources Category */}
                    <TableRow className="bg-primary/10 hover:bg-primary/10">
                      <TableCell colSpan={4} className="font-bold text-primary text-sm uppercase tracking-wide py-3">
                        Tools & Resources
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Nutrition calculator tools</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>

                    {/* Support & Community Category */}
                    <TableRow className="bg-primary/10 hover:bg-primary/10">
                      <TableCell colSpan={4} className="font-bold text-primary text-sm uppercase tracking-wide py-3">
                        Support & Community
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Priority support</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Monthly live Q&A sessions</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">24/7 priority support</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Private Discord channel</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>

                    {/* Personal Coaching Category */}
                    <TableRow className="bg-primary/10 hover:bg-primary/10">
                      <TableCell colSpan={4} className="font-bold text-primary text-sm uppercase tracking-wide py-3">
                        Personal Coaching
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">1-on-1 coaching calls</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Custom meal plans</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Custom workout programming</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Weekly progress reviews</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                    <TableRow className="border-border">
                      <TableCell className="font-medium text-foreground pl-8">Competition prep guidance</TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><X className="h-5 w-5 text-muted-foreground mx-auto" /></TableCell>
                      <TableCell className="text-center"><Check className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
