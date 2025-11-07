import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { User, CreditCard, BookOpen, Bookmark, Mail, Lock, Calendar, CheckCircle2, PlayCircle, FileText, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with real data from backend
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  joinDate: "January 2024",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
};

const mockSubscription = {
  plan: "Pro Plan",
  status: "Active",
  nextBilling: "March 15, 2024",
  price: "$29.99/month"
};

const mockEnrolledCourses = [
  {
    id: "1",
    title: "Complete Strength Training",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"
  },
  {
    id: "2",
    title: "Bodyweight Mastery",
    progress: 30,
    totalLessons: 18,
    completedLessons: 5,
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400"
  }
];

const mockSavedContent = {
  workouts: [
    { id: "1", title: "Full Body Workout", type: "Workout", savedDate: "2024-02-20" },
    { id: "2", title: "HIIT Training", type: "Workout", savedDate: "2024-02-18" }
  ],
  blogPosts: [
    { id: "1", title: "Nutrition Guide for Beginners", type: "Blog Post", savedDate: "2024-02-15" },
    { id: "2", title: "Recovery Techniques", type: "Blog Post", savedDate: "2024-02-10" }
  ]
};

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSaveProfile = () => {
    // Validate and save profile changes
    toast({
      title: "Profile Updated",
      description: "Your account details have been successfully updated."
    });
    setIsEditing(false);
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription will remain active until the end of the billing period.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img src={mockUser.avatar} alt={mockUser.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{mockUser.name}</h1>
              <p className="text-muted-foreground">Member since {mockUser.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="account">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="subscription">
              <CreditCard className="w-4 h-4 mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="courses">
              <BookOpen className="w-4 h-4 mr-2" />
              My Courses
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>

          {/* Account Details Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Manage your personal information and password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex gap-2">
                      <Mail className="w-4 h-4 mt-3 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Change Password
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  ) : (
                    <>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>Manage your membership plan and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">{mockSubscription.plan}</h3>
                      <Badge variant={mockSubscription.status === "Active" ? "default" : "secondary"} className="mt-2">
                        {mockSubscription.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-semibold">{mockSubscription.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next Billing:</span>
                        <span className="font-semibold">{mockSubscription.nextBilling}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{mockSubscription.price.split('/')[0]}</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Plan Benefits</h4>
                  <ul className="space-y-2">
                    {["Unlimited workout access", "All premium courses", "Priority support", "Exclusive community access"].map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link to="/plans">Change Plan</Link>
                  </Button>
                  <Button variant="destructive" onClick={handleCancelSubscription}>
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Courses Tab */}
          <TabsContent value="courses">
            <div className="space-y-4">
              {mockEnrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-32 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {course.completedLessons} of {course.totalLessons} lessons completed
                            </p>
                          </div>
                          <Button size="sm" asChild>
                            <Link to={`/course/${course.id}`}>
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Continue
                            </Link>
                          </Button>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {mockEnrolledCourses.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
                    <p className="text-muted-foreground mb-4">Start your fitness journey by enrolling in a course</p>
                    <Button asChild>
                      <Link to="/workouts">Browse Workouts</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Saved Content Tab */}
          <TabsContent value="saved">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5" />
                    Saved Workouts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockSavedContent.workouts.length > 0 ? (
                    <div className="space-y-3">
                      {mockSavedContent.workouts.map((item) => (
                        <Link
                          key={item.id}
                          to={`/workouts/${item.id}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-smooth"
                        >
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">Saved on {item.savedDate}</p>
                          </div>
                          <Button size="sm" variant="ghost">View</Button>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No saved workouts yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Saved Blog Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockSavedContent.blogPosts.length > 0 ? (
                    <div className="space-y-3">
                      {mockSavedContent.blogPosts.map((item) => (
                        <Link
                          key={item.id}
                          to={`/blog/${item.id}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-smooth"
                        >
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">Saved on {item.savedDate}</p>
                          </div>
                          <Button size="sm" variant="ghost">View</Button>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No saved blog posts yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
