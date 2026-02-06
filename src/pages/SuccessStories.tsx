import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Award, Star, Plus, TrendingUp, Users, Trophy, FileText, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SuccessStory {
  id: number;
  name: string;
  result: string;
  rating: number;
  content: string;
  date: string;
  featured?: boolean;
}

const STORIES_PER_PAGE = 6;

const SuccessStories = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(STORIES_PER_PAGE);
  const [formData, setFormData] = useState({
    name: "",
    result: "",
    rating: 5,
    content: "",
  });

  // Mock authentication state - replace with real auth
  const isAuthenticated = false;

  // Mock data - in a real app, this would come from a database
  const [stories] = useState<SuccessStory[]>([
    {
      id: 1,
      name: "Mike Johnson",
      result: "Lost 30lbs, Gained Muscle",
      rating: 5,
      content: "The natural approach changed my life. No gimmicks, just real science and dedication. After following the Currently Natty programs for 8 months, I've completely transformed my physique and my mindset towards fitness.",
      date: "2024-01-15",
      featured: true,
    },
    {
      id: 2,
      name: "Sarah Chen",
      result: "Transformed in 12 Months",
      rating: 5,
      content: "Finally found a community that understands natural bodybuilding. The programs actually work! I went from a complete beginner to competing in my first natural bodybuilding show. The support from the community was incredible.",
      date: "2024-02-20",
      featured: true,
    },
    {
      id: 3,
      name: "David Martinez",
      result: "Broke Through Plateau",
      rating: 5,
      content: "After years of spinning my wheels, these science-based methods helped me make real progress. I was stuck at the same weight for 2 years, but after implementing the progressive overload techniques, I finally broke through.",
      date: "2024-03-10",
      featured: true,
    },
    {
      id: 4,
      name: "Emily Roberts",
      result: "Gained 15lbs of Lean Muscle",
      rating: 5,
      content: "As a hardgainer, I thought building muscle naturally was impossible for me. Currently Natty proved me wrong. The nutrition guidance and training splits were exactly what I needed.",
      date: "2024-04-05",
    },
    {
      id: 5,
      name: "James Wilson",
      result: "First Competition Ready",
      rating: 4,
      content: "Went from casual gym-goer to stage-ready in 18 months. The structured approach and community support made all the difference. Can't recommend this enough for anyone serious about natural bodybuilding.",
      date: "2024-05-12",
    },
    {
      id: 6,
      name: "Ana García",
      result: "Lifestyle Transformation",
      rating: 5,
      content: "It's not just about the physical changes - my entire lifestyle has improved. Better sleep, more energy, and a positive relationship with food and exercise. Currently Natty taught me sustainable fitness.",
      date: "2024-06-18",
    },
  ]);

  const handleShareStoryClick = () => {
    if (isAuthenticated) {
      setDialogOpen(true);
    } else {
      setAuthDialogOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.result || !formData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Story Submitted!",
      description: "Thank you for sharing your success story. It will be reviewed and published soon.",
    });

    setFormData({ name: "", result: "", rating: 5, content: "" });
    setDialogOpen(false);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-secondary fill-secondary" : "text-muted"}`}
      />
    ));
  };

  const featuredStories = stories.filter((s) => s.featured);
  const otherStories = stories.filter((s) => !s.featured);
  const visibleOtherStories = otherStories.slice(0, visibleCount);
  const hasMoreStories = visibleCount < otherStories.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
            Community
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Success Stories</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Real transformations from real people. These are the stories of our community members who achieved their fitness goals naturally.
          </p>
          <Button variant="hero" size="lg" onClick={handleShareStoryClick}>
            <Plus className="mr-2 h-5 w-5" />
            Share Your Story
          </Button>

          {/* Submit Story Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Share Your Success Story</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="result">Your Result / Achievement *</Label>
                  <Input
                    id="result"
                    placeholder="e.g., Lost 20lbs in 6 months"
                    value={formData.result}
                    onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= formData.rating
                              ? "text-secondary fill-secondary"
                              : "text-muted"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Your Story *</Label>
                  <Textarea
                    id="content"
                    placeholder="Tell us about your journey, what worked for you, and how Currently Natty helped you achieve your goals..."
                    rows={5}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero" className="flex-1">
                    Submit Story
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Auth Required Dialog */}
          <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
            <DialogContent className="sm:max-w-md text-center">
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/20">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <DialogTitle className="text-xl">Members Only Feature</DialogTitle>
                <DialogDescription className="text-muted-foreground pt-2">
                  Sharing your success story is an exclusive feature for our members. Join our community to inspire others with your transformation journey!
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                <Button variant="hero" onClick={() => navigate("/plans")}>
                  View Membership Plans
                </Button>
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  Already a member? Sign In
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Success Stories</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-secondary">95%</div>
              <div className="text-sm text-muted-foreground">Goal Achievement</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-8">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Featured Stories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <Card key={story.id} className="gradient-card border-primary/30 hover:border-primary transition-smooth">
                <CardHeader className="pb-3">
                  <div className="flex gap-1 mb-2">{renderStars(story.rating)}</div>
                  <Badge className="w-fit bg-primary/20 text-primary border-primary/30 mb-2">
                    Featured
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic mb-4">"{story.content}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold">{story.name}</p>
                    <p className="text-sm text-primary">{story.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Stories */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">More Transformations</h2>
          
          {otherStories.length === 0 ? (
            /* Empty State */
            <Card className="bg-card border-dashed border-2 border-border">
              <CardContent className="py-16 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-muted">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">No Stories Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Be the first to share your transformation journey! Your story could inspire others in our community.
                </p>
                <Button variant="hero" onClick={handleShareStoryClick}>
                  <Plus className="mr-2 h-4 w-4" />
                  Share Your Story
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleOtherStories.map((story) => (
                  <Card key={story.id} className="bg-card border-border hover:border-primary/50 transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-3">{renderStars(story.rating)}</div>
                      <p className="text-muted-foreground italic mb-4 line-clamp-4">"{story.content}"</p>
                      <div className="border-t border-border pt-4">
                        <p className="font-semibold">{story.name}</p>
                        <p className="text-sm text-primary">{story.result}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {hasMoreStories && (
                <div className="flex justify-center mt-8">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setVisibleCount(prev => prev + STORIES_PER_PAGE)}
                  >
                    Load More Stories
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Story?</h2>
          <p className="text-muted-foreground mb-8">
            Join our community and start your transformation journey today. Your success story could be next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="/plans">Start Your Journey</a>
            </Button>
            <Button variant="outline" size="lg" onClick={handleShareStoryClick}>
              <Plus className="mr-2 h-4 w-4" />
              Share Your Story
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;