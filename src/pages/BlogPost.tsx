import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, ArrowLeft, Share2, Bookmark, MessageSquare, ThumbsUp, Reply, Tag } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockComments = [
  {
    id: 1,
    author: "Mike Johnson",
    avatar: "MJ",
    date: "2 days ago",
    content: "Great article! This really helped me understand progressive overload better. I've been implementing these techniques and seeing consistent gains.",
    likes: 12,
    replies: [
      {
        id: 11,
        author: "Currently Natty Team",
        avatar: "CN",
        date: "1 day ago",
        content: "Thanks Mike! Glad to hear you're seeing results. Keep pushing!",
        likes: 5
      }
    ]
  },
  {
    id: 2,
    author: "Sarah Williams",
    avatar: "SW",
    date: "5 days ago",
    content: "The part about deload weeks was eye-opening. I used to think rest was for the weak, but now I understand it's crucial for long-term progress.",
    likes: 8,
    replies: []
  },
  {
    id: 3,
    author: "Tom Anderson",
    avatar: "TA",
    date: "1 week ago",
    content: "Could you elaborate more on the nutrition aspects? Would love to see a follow-up article specifically about macro tracking for natural lifters.",
    likes: 15,
    replies: []
  },
];

const mockRelatedPosts = [
  {
    id: "2",
    title: "Progressive Overload: The Key to Consistent Gains",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&q=80",
    category: "Training",
    readTime: "6 min"
  },
  {
    id: "3",
    title: "Nutrition Fundamentals for Natural Athletes",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
    category: "Nutrition",
    readTime: "10 min"
  },
  {
    id: "4",
    title: "Recovery Strategies That Actually Work",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e067?w=400&q=80",
    category: "Recovery",
    readTime: "7 min"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "You",
      avatar: "YO",
      date: "Just now",
      content: newComment,
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully.",
    });
  };

  const handleReplySubmit = (commentId: number) => {
    if (!replyContent.trim()) return;

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, {
            id: Date.now(),
            author: "You",
            avatar: "YO",
            date: "Just now",
            content: replyContent,
            likes: 0
          }]
        };
      }
      return comment;
    }));

    setReplyContent("");
    setReplyingTo(null);
    toast({
      title: "Reply posted!",
      description: "Your reply has been added.",
    });
  };

  // Mock data - in real app this would come from a backend
  const post = {
    id: id,
    title: "The Science of Natural Muscle Building",
    author: "Currently Natty Team",
    category: "Training",
    tags: ["Muscle Building", "Progressive Overload", "Natural Lifting", "Hypertrophy", "Strength Training"],
    readTime: "8 min",
    publishDate: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    content: `
      <h2>Understanding Natural Muscle Growth</h2>
      <p>Building muscle naturally requires understanding the fundamental principles of hypertrophy and progressive overload. Unlike enhanced athletes, natural lifters must be more strategic with their training approach.</p>
      
      <blockquote>
        <p>"The iron never lies to you. You can walk outside and listen to all kinds of talk, get told that you're a god or a total bastard. The iron will always kick you the real deal."</p>
        <cite>— Henry Rollins</cite>
      </blockquote>
      
      <h3>Key Principles for Natural Athletes</h3>
      <p>Progressive overload remains the cornerstone of muscle growth. This means consistently challenging your muscles with increasing demands over time, whether through added weight, volume, or intensity.</p>
      
      <blockquote>
        <p>"Strength does not come from physical capacity. It comes from an indomitable will."</p>
        <cite>— Mahatma Gandhi</cite>
      </blockquote>
      
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
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Badge variant="outline" className="border-primary text-primary">
              {post.category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <span className="text-sm text-muted-foreground">{post.publishDate}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
              >
                {tag}
              </Badge>
            ))}
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

          {/* Content with Quote Styling */}
          <Card className="gradient-card border-border p-8">
            <div 
              className={`prose prose-invert max-w-none 
                [&_blockquote]:relative [&_blockquote]:pl-8 [&_blockquote]:py-4 [&_blockquote]:my-8 
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 
                [&_blockquote]:rounded-r-lg [&_blockquote]:italic
                [&_blockquote_p]:text-lg [&_blockquote_p]:text-foreground/90 [&_blockquote_p]:mb-2
                [&_blockquote_cite]:text-sm [&_blockquote_cite]:text-muted-foreground [&_blockquote_cite]:not-italic [&_blockquote_cite]:font-medium`}
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

          {/* Related Posts Section */}
          <div className="mt-12">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRelatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                  <Card className="gradient-card border-border overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                          {relatedPost.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                      </div>
                      <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12">
            <Separator className="mb-8" />
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Discussion ({comments.length})</h2>
              </div>

              {/* Comment Form */}
              <Card className="gradient-card border-border p-6 mb-8">
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <Avatar className="hidden sm:flex">
                      <AvatarFallback className="bg-primary/10 text-primary">YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your thoughts on this article..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="hero" disabled={!newComment.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <Card key={comment.id} className="gradient-card border-border p-6">
                    <div className="flex gap-4">
                      <Avatar className="hidden sm:flex">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {comment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{comment.author}</span>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-muted-foreground mb-4">{comment.content}</p>
                        
                        {/* Comment Actions */}
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{comment.likes}</span>
                          </button>
                          <button 
                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Reply className="h-4 w-4" />
                            <span>Reply</span>
                          </button>
                        </div>

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div className="mt-4 pl-4 border-l-2 border-border">
                            <Textarea
                              placeholder="Write a reply..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="min-h-[80px] resize-none mb-3"
                            />
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setReplyingTo(null)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                variant="hero" 
                                size="sm" 
                                onClick={() => handleReplySubmit(comment.id)}
                                disabled={!replyContent.trim()}
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Nested Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-4 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="pl-4 border-l-2 border-primary/30">
                                <div className="flex gap-3">
                                  <Avatar className="h-8 w-8 hidden sm:flex">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                      {reply.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold text-sm">{reply.author}</span>
                                      <span className="text-xs text-muted-foreground">{reply.date}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{reply.content}</p>
                                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-2">
                                      <ThumbsUp className="h-3 w-3" />
                                      <span>{reply.likes}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
