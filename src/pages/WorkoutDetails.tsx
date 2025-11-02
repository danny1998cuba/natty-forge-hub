import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Play, CheckCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const workout = {
    id: id,
    title: "Natural Hypertrophy Program",
    level: "Intermediate",
    duration: "12 weeks",
    price: "$49",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
    description: "A comprehensive 12-week program designed specifically for natural athletes looking to maximize muscle growth through science-based training principles.",
    includes: [
      "12-week progressive training program",
      "Video demonstrations for every exercise",
      "Comprehensive nutrition guide",
      "Weekly training splits",
      "Deload protocols",
      "Progress tracking sheets",
      "Access to private support group",
      "Lifetime updates"
    ],
    weekBreakdown: [
      { week: "Weeks 1-4", focus: "Foundation & Form Mastery", sets: "3-4 sets per exercise" },
      { week: "Weeks 5-8", focus: "Volume Accumulation", sets: "4-5 sets per exercise" },
      { week: "Weeks 9-11", focus: "Intensity & Overload", sets: "3-5 sets per exercise" },
      { week: "Week 12", focus: "Deload & Recovery", sets: "2-3 sets per exercise" },
    ],
    testimonials: [
      { name: "Mike R.", result: "Gained 12 lbs lean muscle", rating: 5 },
      { name: "Sarah K.", result: "Increased all lifts by 30%+", rating: 5 },
    ]
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button 
            variant="outline" 
            onClick={() => navigate('/workouts')}
            className="mb-6 border-border hover:border-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Programs
          </Button>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img 
                  src={workout.image} 
                  alt={workout.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="border-secondary text-secondary">
                    {workout.level}
                  </Badge>
                  <span className="text-muted-foreground">⏱️ {workout.duration}</span>
                </div>
                <h1 className="mb-4">{workout.title}</h1>
                <p className="text-lg text-muted-foreground">{workout.description}</p>
              </div>

              <Card className="gradient-card border-border p-6">
                <h3 className="mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {workout.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="gradient-card border-border p-6">
                <h3 className="mb-4">Program Structure</h3>
                <div className="space-y-4">
                  {workout.weekBreakdown.map((phase, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h4 className="text-lg font-semibold mb-1">{phase.week}</h4>
                      <p className="text-muted-foreground mb-1">{phase.focus}</p>
                      <p className="text-sm text-secondary">{phase.sets}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="gradient-card border-border p-6">
                <h3 className="mb-4">Success Stories</h3>
                <div className="space-y-4">
                  {workout.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-2 border-secondary pl-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground">{testimonial.result}</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-secondary">★</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar - Purchase Card */}
            <div className="lg:col-span-2">
              <Card className="gradient-card border-primary p-6 sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-primary mb-2">{workout.price}</p>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>

                <Button variant="hero" size="lg" className="w-full mb-4">
                  <Download className="h-5 w-5 mr-2" />
                  Get Program
                </Button>

                <Button variant="outline" size="lg" className="w-full border-border hover:border-primary">
                  <Play className="h-5 w-5 mr-2" />
                  Preview Sample
                </Button>

                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Instant digital access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Lifetime updates included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
