import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Flag, Check, X } from "lucide-react";
import { mockCommunityPosts, type CommunityPost } from "@/data/mockAdminData";

export default function CommunityManagement() {
  const [posts] = useState<CommunityPost[]>(mockCommunityPosts);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'flagged':
        return <Badge variant="destructive">Flagged</Badge>;
      default:
        return null;
    }
  };

  const filterPosts = (status?: string) => {
    return status ? posts.filter(p => p.status === status) : posts;
  };

  const PostCard = ({ post }: { post: CommunityPost }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-muted-foreground">{post.createdAt}</p>
            </div>
            {getStatusBadge(post.status)}
          </div>
          
          <p className="text-sm">{post.content}</p>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {post.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {post.comments}
              </div>
            </div>
            
            <div className="flex gap-2">
              {post.status === 'pending' && (
                <>
                  <Button size="sm" variant="default">
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </>
              )}
              {post.status === 'flagged' && (
                <>
                  <Button size="sm" variant="default">
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Flag className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </>
              )}
              {post.status === 'approved' && (
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Community Management</h2>
        <p className="text-muted-foreground">Moderate community posts and interactions</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All Posts ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({filterPosts('pending').length})
          </TabsTrigger>
          <TabsTrigger value="flagged">
            Flagged ({filterPosts('flagged').length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({filterPosts('approved').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterPosts('pending').map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          {filterPosts('flagged').map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filterPosts('approved').map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
