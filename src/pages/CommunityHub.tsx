import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Users, MessageSquare, Trophy, Heart, Search, TrendingUp, Pin } from "lucide-react";

const forumPosts = [
  {
    id: 1,
    title: "Just hit a new PR on bench press! 225lbs x 5",
    author: "MikeNatty",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    category: "Progress Updates",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    isPinned: true,
  },
  {
    id: 2,
    title: "Best protein sources for bulking season?",
    author: "FitSarah",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    category: "Nutrition & Diet",
    replies: 18,
    likes: 32,
    timeAgo: "4 hours ago",
    isPinned: false,
  },
  {
    id: 3,
    title: "6 month transformation - all natural!",
    author: "JohnGains",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    category: "Progress Updates",
    replies: 67,
    likes: 156,
    timeAgo: "5 hours ago",
    isPinned: false,
  },
  {
    id: 4,
    title: "Dealing with plateau - need advice",
    author: "LiftingLisa",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    category: "Training Discussion",
    replies: 34,
    likes: 28,
    timeAgo: "7 hours ago",
    isPinned: false,
  },
];

const trendingTopics = [
  { name: "Progressive Overload", posts: 234 },
  { name: "Meal Prep Ideas", posts: 189 },
  { name: "Recovery Tips", posts: 156 },
  { name: "Form Check", posts: 142 },
];

const leaderboard = [
  { name: "AlphaNatty", points: 2840, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha" },
  { name: "IronMike", points: 2356, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=IronMike" },
  { name: "NattyQueen", points: 2198, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Queen" },
];

const CommunityHub = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Training Discussion":
        return <Users className="h-4 w-4" />;
      case "Nutrition & Diet":
        return <Heart className="h-4 w-4" />;
      case "Progress Updates":
        return <Trophy className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <h1 className="mb-4">Community Hub</h1>
            <p className="text-xl text-muted-foreground">
              Connect with fellow natural athletes and share your journey
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Filter */}
              <Card className="gradient-card border-border p-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search discussions..." 
                      className="pl-10 border-border bg-background"
                    />
                  </div>
                  <Button variant="outline" className="border-border hover:border-primary">
                    Filter
                  </Button>
                </div>
              </Card>

              {/* New Post Button */}
              <Button variant="hero" size="lg" className="w-full">
                <MessageSquare className="h-5 w-5 mr-2" />
                Start New Discussion
              </Button>

              {/* Forum Posts */}
              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="gradient-card border-border p-6 hover:border-primary transition-smooth group cursor-pointer">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary">
                        <img src={post.avatar} alt={post.author} />
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            {post.isPinned && (
                              <Pin className="h-4 w-4 text-secondary" />
                            )}
                            <h3 className="text-lg group-hover:text-primary transition-smooth">
                              {post.title}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{post.author}</span>
                          <span>•</span>
                          <span>{post.timeAgo}</span>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                          <Badge variant="outline" className="border-primary text-primary">
                            <span className="mr-1">{getCategoryIcon(post.category)}</span>
                            {post.category}
                          </Badge>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {post.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {post.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trending Topics */}
              <Card className="gradient-card border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Trending</h3>
                </div>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 rounded-lg hover:bg-accent transition-smooth"
                    >
                      <p className="font-medium text-sm">{topic.name}</p>
                      <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Leaderboard */}
              <Card className="gradient-card border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-5 w-5 text-secondary" />
                  <h3 className="text-lg font-semibold">Top Contributors</h3>
                </div>
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary w-6">
                        {index + 1}
                      </span>
                      <Avatar className="h-8 w-8 border border-border">
                        <img src={user.avatar} alt={user.name} />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.points} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Community Stats */}
              <Card className="gradient-card border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Community Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Members</span>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Today</span>
                    <span className="font-semibold">3,421</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Posts</span>
                    <span className="font-semibold">45,123</span>
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

export default CommunityHub;
