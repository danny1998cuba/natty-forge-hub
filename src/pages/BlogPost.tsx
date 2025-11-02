import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from a backend
  const post = {
    id: id,
    title: "The Science of Natural Muscle Building",
    author: "Currently Natty Team",
    category: "Training",
    readTime: "8 min",
    publishDate: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    content: `
      <h2>Understanding Natural Muscle Growth</h2>
      <p>Building muscle naturally requires understanding the fundamental principles of hypertrophy and progressive overload. Unlike enhanced athletes, natural lifters must be more strategic with their training approach.</p>
      
      <h3>Key Principles for Natural Athletes</h3>
      <p>Progressive overload remains the cornerstone of muscle growth. This means consistently challenging your muscles with increasing demands over time, whether through added weight, volume, or intensity.</p>
      
      <h3>Optimal Training Frequency</h3>
      <p>Research suggests training each muscle group 2-3 times per week optimizes protein synthesis for natural athletes. This frequency allows adequate recovery while maximizing growth signals.</p>
      
      <h3>Volume Considerations</h3>
      <p>Natural lifters typically respond best to 10-20 sets per muscle group per week. More isn't always better - recovery capacity is crucial for natural athletes.</p>
      
      <h3>Nutrition for Natural Gains</h3>
      <p>Proper nutrition is non-negotiable. Aim for 1.6-2.2g of protein per kilogram of bodyweight daily, combined with a slight caloric surplus during muscle-building phases.</p>
    `
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <article className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button 
            variant="outline" 
            onClick={() => navigate('/blog')}
            className="mb-6 border-border hover:border-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          {/* Hero Image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant="outline" className="border-primary text-primary">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <span className="text-sm text-muted-foreground">{post.publishDate}</span>
          </div>

          {/* Title */}
          <h1 className="mb-4">{post.title}</h1>
          <p className="text-muted-foreground mb-8">By {post.author}</p>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button variant="outline" size="sm" className="border-border hover:border-primary">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-border hover:border-primary">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>

          {/* Content */}
          <Card className="gradient-card border-border p-8">
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>

          {/* Call to Action */}
          <Card className="gradient-card border-primary p-8 mt-8 text-center">
            <h3 className="mb-4">Want More Premium Content?</h3>
            <p className="text-muted-foreground mb-6">
              Get access to exclusive training guides, nutrition plans, and member-only articles
            </p>
            <Button variant="hero" size="lg">
              Become a Member
            </Button>
          </Card>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
