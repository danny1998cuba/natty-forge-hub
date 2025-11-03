import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, CreditCard, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { mockUsers, mockProducts, mockPlans, mockBlogPosts, mockCommunityPosts } from "@/data/mockAdminData";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: mockUsers.length,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Products",
      value: mockProducts.filter(p => p.status === 'active').length,
      change: "+3",
      trend: "up",
      icon: Package,
      color: "text-green-600",
    },
    {
      title: "Total Plans",
      value: mockPlans.length,
      change: "0%",
      trend: "neutral",
      icon: CreditCard,
      color: "text-purple-600",
    },
    {
      title: "Blog Posts",
      value: mockBlogPosts.length,
      change: "+2",
      trend: "up",
      icon: FileText,
      color: "text-orange-600",
    },
  ];

  const recentActivity = [
    { action: "New user registered", user: "Sarah Williams", time: "2 hours ago" },
    { action: "Product updated", user: "Admin", time: "4 hours ago" },
    { action: "Blog post published", user: "Jane Smith", time: "1 day ago" },
    { action: "Community post flagged", user: "System", time: "1 day ago" },
  ];

  const totalSubscribers = mockPlans.reduce((sum, plan) => sum + plan.subscribers, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : stat.trend === "down" ? (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                ) : null}
                <span>{stat.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Subscribers</span>
                <span className="text-2xl font-bold">{totalSubscribers}</span>
              </div>
              <p className="text-xs text-muted-foreground">Across all plans</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pending Posts</span>
                <span className="text-2xl font-bold">
                  {mockCommunityPosts.filter(p => p.status === 'pending').length}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Awaiting moderation</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Draft Articles</span>
                <span className="text-2xl font-bold">
                  {mockBlogPosts.filter(p => p.status === 'draft').length}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Ready to publish</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
