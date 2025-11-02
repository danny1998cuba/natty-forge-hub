import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Lock, Eye } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Science of Natural Muscle Building",
    excerpt: "Understanding the biological limits and optimal strategies for natural bodybuilders...",
    category: "Training",
    readTime: "8 min",
    access: "public",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
  },
  {
    id: 2,
    title: "Advanced Progressive Overload Techniques",
    excerpt: "Take your training to the next level with these proven progressive overload methods...",
    category: "Advanced",
    readTime: "12 min",
    access: "partial",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
  },
  {
    id: 3,
    title: "Nutrition Secrets for Natural Gains",
    excerpt: "Exclusive insights into optimizing your diet for maximum muscle growth naturally...",
    category: "Nutrition",
    readTime: "15 min",
    access: "private",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
  },
  {
    id: 4,
    title: "Recovery Protocols That Actually Work",
    excerpt: "Evidence-based recovery strategies to maximize your gains and prevent burnout...",
    category: "Recovery",
    readTime: "10 min",
    access: "public",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
  },
];

const Blog = () => {
  const getAccessIcon = (access: string) => {
    switch (access) {
      case "public":
        return <Eye className="h-4 w-4" />;
      case "partial":
        return <Lock className="h-4 w-4 text-secondary" />;
      case "private":
        return <Lock className="h-4 w-4 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="mb-4">Fitness Blog</h1>
            <p className="text-xl text-muted-foreground">
              Deep dives into training, nutrition, and natural bodybuilding science
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <Card key={post.id} className="gradient-card border-border overflow-hidden hover:border-primary transition-smooth group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-primary text-primary">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                    {getAccessIcon(post.access)}
                  </div>
                  <h3 className="mb-2 group-hover:text-primary transition-smooth">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button 
                    variant={post.access === "private" ? "hero" : "outline"}
                    className={post.access !== "private" ? "border-primary text-primary hover:bg-primary/10" : ""}
                  >
                    {post.access === "private" ? "Members Only" : "Read More"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
