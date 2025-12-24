import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, ArrowLeft, Share2, Bookmark, MessageSquare, ThumbsUp, Reply, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

// Generate more mock comments for infinite scroll demo
const generateMockComments = (count: number, startId: number = 1) => {
  const names = ["Mike Johnson", "Sarah Williams", "Tom Anderson", "Emily Chen", "David Kim", "Lisa Park", "James Wilson", "Anna Martinez"];
  const contents = [
    "Great article! This really helped me understand progressive overload better.",
    "The part about deload weeks was eye-opening.",
    "Could you elaborate more on the nutrition aspects?",
    "I've been implementing these techniques and seeing consistent gains.",
    "This is exactly what I needed to read today.",
    "Fantastic breakdown of the science behind muscle growth.",
    "Would love to see more content like this!",
    "Been training for years and still learned something new."
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const name = names[Math.floor(Math.random() * names.length)];
    const hasReplies = Math.random() > 0.6;
    const replyCount = hasReplies ? Math.floor(Math.random() * 5) + 1 : 0;
    
    return {
      id: startId + i,
      author: name,
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      avatar: name.split(' ').map(n => n[0]).join(''),
      date: `${Math.floor(Math.random() * 30) + 1} days ago`,
      content: contents[Math.floor(Math.random() * contents.length)],
      likes: Math.floor(Math.random() * 50),
      replies: Array.from({ length: replyCount }, (_, j) => {
        const replyName = names[Math.floor(Math.random() * names.length)];
        return {
          id: (startId + i) * 1000 + j,
          author: replyName,
          email: `${replyName.toLowerCase().replace(' ', '.')}@email.com`,
          avatar: replyName.split(' ').map(n => n[0]).join(''),
          date: `${Math.floor(Math.random() * 10) + 1} days ago`,
          content: contents[Math.floor(Math.random() * contents.length)],
          likes: Math.floor(Math.random() * 20),
          replyTo: null as string | null
        };
      })
    };
  });
};

const COMMENTS_PER_PAGE = 5;
const REPLIES_PREVIEW_COUNT = 2;

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

interface ReplyType {
  id: number;
  author: string;
  email: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replyTo: string | null;
}

interface CommentType {
  id: number;
  author: string;
  email: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replies: ReplyType[];
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Comment form state
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [newComment, setNewComment] = useState("");
  
  // Comments state
  const [allComments] = useState<CommentType[]>(generateMockComments(25));
  const [displayedComments, setDisplayedComments] = useState<CommentType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Reply state
  const [replyingTo, setReplyingTo] = useState<{ commentId: number; replyToUser?: string } | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [replyContent, setReplyContent] = useState("");
  
  // Expanded replies state
  const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set());
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    setDisplayedComments(allComments.slice(0, COMMENTS_PER_PAGE));
    setHasMore(allComments.length > COMMENTS_PER_PAGE);
  }, [allComments]);

  // Infinite scroll observer
  const loadMoreComments = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const currentLength = displayedComments.length;
      const nextComments = allComments.slice(currentLength, currentLength + COMMENTS_PER_PAGE);
      
      if (nextComments.length > 0) {
        setDisplayedComments(prev => [...prev, ...nextComments]);
        setHasMore(currentLength + nextComments.length < allComments.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 500);
  }, [allComments, displayedComments.length, hasMore, isLoading]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreComments();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMoreComments]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentName.trim() || !commentEmail.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name, email, and comment.",
        variant: "destructive"
      });
      return;
    }

    const comment: CommentType = {
      id: Date.now(),
      author: commentName,
      email: commentEmail,
      avatar: commentName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      date: "Just now",
      content: newComment,
      likes: 0,
      replies: []
    };

    setDisplayedComments([comment, ...displayedComments]);
    setNewComment("");
    setCommentName("");
    setCommentEmail("");
    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully.",
    });
  };

  const handleReplySubmit = (commentId: number) => {
    if (!replyContent.trim() || !replyName.trim() || !replyEmail.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name, email, and reply.",
        variant: "destructive"
      });
      return;
    }

    const newReply: ReplyType = {
      id: Date.now(),
      author: replyName,
      email: replyEmail,
      avatar: replyName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      date: "Just now",
      content: replyContent,
      likes: 0,
      replyTo: replyingTo?.replyToUser || null
    };

    setDisplayedComments(displayedComments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    }));

    // Auto-expand replies when adding new one
    setExpandedReplies(prev => new Set([...prev, commentId]));
    
    setReplyContent("");
    setReplyName("");
    setReplyEmail("");
    setReplyingTo(null);
    toast({
      title: "Reply posted!",
      description: "Your reply has been added.",
    });
  };

  const toggleReplies = (commentId: number) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const startReplyToReply = (commentId: number, replyAuthor: string) => {
    setReplyingTo({ commentId, replyToUser: replyAuthor });
    setReplyContent(`@${replyAuthor} `);
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

  const totalComments = allComments.length + allComments.reduce((acc, c) => acc + c.replies.length, 0);

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
            {/* Inline Tags - compact design */}
            <span className="text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {post.tags.slice(0, 3).join(", ")}
              {post.tags.length > 3 && ` +${post.tags.length - 3}`}
            </span>
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

          {/* Tags Section - at end of content */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <Link 
                key={tag} 
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                #{tag.replace(/\s+/g, '')}
              </Link>
            ))}
          </div>

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
                <h2 className="text-2xl font-bold">Discussion ({totalComments})</h2>
              </div>

              {/* Comment Form */}
              <Card className="gradient-card border-border p-6 mb-8">
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your name *"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email *"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Share your thoughts on this article..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px] resize-none"
                    required
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Your email won't be published</p>
                    <Button type="submit" variant="hero" disabled={!newComment.trim() || !commentName.trim() || !commentEmail.trim()}>
                      Post Comment
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Comments List with Infinite Scroll */}
              <div className="space-y-6">
                {displayedComments.map((comment) => {
                  const isExpanded = expandedReplies.has(comment.id);
                  const hasMoreReplies = comment.replies.length > REPLIES_PREVIEW_COUNT;
                  const visibleReplies = isExpanded ? comment.replies : comment.replies.slice(0, REPLIES_PREVIEW_COUNT);
                  
                  return (
                    <Card key={comment.id} className="gradient-card border-border p-4 sm:p-6">
                      <div className="flex gap-3 sm:gap-4">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm">
                            {comment.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-semibold text-sm sm:text-base">{comment.author}</span>
                            <span className="text-xs sm:text-sm text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm sm:text-base text-muted-foreground mb-3">{comment.content}</p>
                          
                          {/* Comment Actions */}
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                              <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{comment.likes}</span>
                            </button>
                            <button 
                              onClick={() => setReplyingTo(replyingTo?.commentId === comment.id && !replyingTo.replyToUser ? null : { commentId: comment.id })}
                              className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Reply className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>Reply</span>
                            </button>
                            {comment.replies.length > 0 && (
                              <span className="text-xs sm:text-sm text-muted-foreground">
                                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                              </span>
                            )}
                          </div>

                          {/* Reply Form */}
                          {replyingTo?.commentId === comment.id && (
                            <div className="mt-4 pl-3 sm:pl-4 border-l-2 border-border">
                              {replyingTo.replyToUser && (
                                <p className="text-xs text-primary mb-2">Replying to @{replyingTo.replyToUser}</p>
                              )}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <Input
                                  placeholder="Your name *"
                                  value={replyName}
                                  onChange={(e) => setReplyName(e.target.value)}
                                  className="text-sm"
                                />
                                <Input
                                  type="email"
                                  placeholder="Your email *"
                                  value={replyEmail}
                                  onChange={(e) => setReplyEmail(e.target.value)}
                                  className="text-sm"
                                />
                              </div>
                              <Textarea
                                placeholder="Write a reply..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="min-h-[60px] resize-none mb-3 text-sm"
                              />
                              <div className="flex gap-2 justify-end">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyContent("");
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  variant="hero" 
                                  size="sm" 
                                  onClick={() => handleReplySubmit(comment.id)}
                                  disabled={!replyContent.trim() || !replyName.trim() || !replyEmail.trim()}
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Nested Replies */}
                          {visibleReplies.length > 0 && (
                            <div className="mt-4 space-y-3">
                              {visibleReplies.map((reply) => (
                                <div key={reply.id} className="pl-3 sm:pl-4 border-l-2 border-primary/20">
                                  <div className="flex gap-2 sm:gap-3">
                                    <Avatar className="h-6 w-6 flex-shrink-0">
                                      <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                                        {reply.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                        <span className="font-semibold text-xs sm:text-sm">{reply.author}</span>
                                        {reply.replyTo && (
                                          <span className="text-xs text-primary">@{reply.replyTo}</span>
                                        )}
                                        <span className="text-[10px] sm:text-xs text-muted-foreground">{reply.date}</span>
                                      </div>
                                      <p className="text-xs sm:text-sm text-muted-foreground">{reply.content}</p>
                                      <div className="flex items-center gap-3 mt-1">
                                        <button className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground hover:text-primary transition-colors">
                                          <ThumbsUp className="h-3 w-3" />
                                          <span>{reply.likes}</span>
                                        </button>
                                        <button 
                                          onClick={() => startReplyToReply(comment.id, reply.author)}
                                          className="text-[10px] sm:text-xs text-muted-foreground hover:text-primary transition-colors"
                                        >
                                          Reply
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              
                              {/* Show more/less replies toggle */}
                              {hasMoreReplies && (
                                <button
                                  onClick={() => toggleReplies(comment.id)}
                                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors pl-3 sm:pl-4"
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronUp className="h-3 w-3" />
                                      Show less replies
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-3 w-3" />
                                      Show {comment.replies.length - REPLIES_PREVIEW_COUNT} more {comment.replies.length - REPLIES_PREVIEW_COUNT === 1 ? 'reply' : 'replies'}
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
                
                {/* Load more trigger / loading indicator */}
                <div ref={loadMoreRef} className="py-4 flex justify-center">
                  {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Loading more comments...</span>
                    </div>
                  )}
                  {!hasMore && displayedComments.length > 0 && (
                    <p className="text-sm text-muted-foreground">No more comments to load</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;