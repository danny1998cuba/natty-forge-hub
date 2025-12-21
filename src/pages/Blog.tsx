import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Lock, Eye } from "lucide-react";
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

const allBlogPosts = [
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
  {
    id: 5,
    title: "Deload Weeks: When and How",
    excerpt: "Master the art of strategic deloading for continuous progress...",
    category: "Training",
    readTime: "9 min",
    access: "public",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
  },
  {
    id: 6,
    title: "Supplement Guide for Natural Athletes",
    excerpt: "Evidence-based supplement recommendations that actually work...",
    category: "Nutrition",
    readTime: "14 min",
    access: "partial",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80"
  },
];

const POSTS_PER_PAGE = 4;

const Blog = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query (ready for vector search API)
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return allBlogPosts;
    const query = searchQuery.toLowerCase();
    return allBlogPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const blogPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <p className="text-xl text-muted-foreground mb-6">
              Deep dives into training, nutrition, and natural bodybuilding science
            </p>
            <div className="max-w-md mx-auto">
              <InlineSearch
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(value) => {
                  setSearchQuery(value);
                  setSearchParams({ page: "1" });
                }}
              />
            </div>
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
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    {post.access === "private" ? "Members Only" : "Read More"}
                  </Button>
                </div>
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

export default Blog;
