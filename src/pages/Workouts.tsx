import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { TrendingUp, Dumbbell, Target, Award, Zap, Trophy } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { InlineSearch } from "@/components/InlineSearch";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const allWorkoutPlans = [
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
  {
    id: 5,
    title: "Fat Loss Accelerator",
    description: "Preserve muscle while cutting body fat effectively",
    level: "Intermediate",
    duration: "10 weeks",
    price: "$45",
    features: ["Cardio protocols", "Macro adjustments", "Progress tracking"],
    icon: Zap
  },
  {
    id: 6,
    title: "Powerlifting Fundamentals",
    description: "Master the big three lifts with proper technique",
    level: "Beginner",
    duration: "12 weeks",
    price: "$42",
    features: ["Video form checks", "Strength programming", "Mobility work"],
    icon: Trophy
  },
];

const PLANS_PER_PAGE = 4;

const Workouts = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter workouts based on search query (ready for vector search API)
  const filteredWorkouts = useMemo(() => {
    if (!searchQuery.trim()) return allWorkoutPlans;
    const query = searchQuery.toLowerCase();
    return allWorkoutPlans.filter(plan =>
      plan.title.toLowerCase().includes(query) ||
      plan.description.toLowerCase().includes(query) ||
      plan.level.toLowerCase().includes(query) ||
      plan.features.some(f => f.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredWorkouts.length / PLANS_PER_PAGE);
  const startIndex = (currentPage - 1) * PLANS_PER_PAGE;
  const endIndex = startIndex + PLANS_PER_PAGE;
  const workoutPlans = filteredWorkouts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="mb-4">Workout Programs</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Scientifically designed training programs for natural athletes
            </p>
            <div className="max-w-md mx-auto">
              <InlineSearch
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(value) => {
                  setSearchQuery(value);
                  setSearchParams({ page: "1" });
                }}
              />
            </div>
          </div>

          {/* Ad Placement - Before Programs */}
          <div className="max-w-6xl mx-auto mb-6">
            <AdPlaceholder size="banner" className="mx-auto" />
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

                <Button variant="hero" className="w-full" onClick={() => navigate(`/workouts/${plan.id}`)}>
                  Get Program
                </Button>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
