import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Trophy, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const forumCategories = [
  {
    title: "Training Discussion",
    description: "Share your workout experiences and ask questions",
    posts: 1234,
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Nutrition & Diet",
    description: "Discuss meal plans, recipes, and nutrition strategies",
    posts: 892,
    icon: Heart,
    color: "text-secondary"
  },
  {
    title: "Progress Updates",
    description: "Share your transformation and inspire others",
    posts: 2156,
    icon: Trophy,
    color: "text-primary"
  },
  {
    title: "General Chat",
    description: "Connect with the community on any topic",
    posts: 3421,
    icon: MessageSquare,
    color: "text-secondary"
  },
];

const Community = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="mb-4">Community Hub</h1>
            <p className="text-xl text-muted-foreground">
              Connect, share, and grow with fellow natural athletes
            </p>
          </div>

          {/* Member Access Required */}
          <Card className="gradient-card border-primary p-8 mb-12 max-w-3xl mx-auto text-center">
            <Users className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="mb-4">Members-Only Community</h2>
            <p className="text-muted-foreground mb-6">
              Join our exclusive community to connect with like-minded athletes, 
              share your progress, and get support on your fitness journey
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/community/hub')}>
              Unlock Community Access
            </Button>
          </Card>

          {/* Forum Categories Preview */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {forumCategories.map((category, index) => (
              <Card key={index} className="gradient-card border-border p-6 hover:border-primary transition-smooth group opacity-60">
                <category.icon className={`h-10 w-10 ${category.color} mb-4`} />
                <h3 className="mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{category.description}</p>
                <Badge variant="outline" className="border-muted">
                  {category.posts} posts
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
