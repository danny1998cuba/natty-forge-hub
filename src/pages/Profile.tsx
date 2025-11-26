import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, CreditCard, BookOpen, Bookmark, Mail, Lock, Calendar, CheckCircle2, PlayCircle, FileText, Dumbbell, Shield, Trash2, Bell, Key, Camera, Fingerprint, Smartphone, ExternalLink, AlertTriangle } from "lucide-react";
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

const mockTransactions = [
  { id: "TXN-001", date: "2024-11-20", concept: "Elite Plan - Monthly", amount: "$49.99", status: "Completed" },
  { id: "TXN-002", date: "2024-11-15", concept: "Workout Plan - Advanced Strength", amount: "$29.99", status: "Completed" },
  { id: "TXN-003", date: "2024-10-20", concept: "Elite Plan - Monthly", amount: "$49.99", status: "Completed" },
  { id: "TXN-004", date: "2024-10-10", concept: "Merchandise - Gym T-Shirt", amount: "$24.99", status: "Completed" },
  { id: "TXN-005", date: "2024-09-20", concept: "Elite Plan - Monthly", amount: "$49.99", status: "Completed" },
];

export default function Profile() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  
  // Dialog states
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [show2FAStep, setShow2FAStep] = useState<"password" | "qr" | "verify">("password");
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [showAddPasskeyDialog, setShowAddPasskeyDialog] = useState(false);
  const [showDeletePasskeyDialog, setShowDeletePasskeyDialog] = useState(false);
  const [selectedPasskey, setSelectedPasskey] = useState<string | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: mockUser.name,
    username: "johndoe",
    email: mockUser.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFAPassword: "",
    twoFACode: "",
    passkeyName: "",
    deleteConfirmation: ""
  });
  
  // Settings states
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    courseUpdates: true,
    comments: false
  });
  
  // Mock connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: true,
    facebook: false,
    apple: false
  });
  
  // Mock passkeys
  const [passkeys, setPasskeys] = useState([
    { id: "1", name: "MacBook Pro", createdAt: "2024-01-15", lastUsed: "2024-02-20" },
    { id: "2", name: "iPhone 15", createdAt: "2024-01-20", lastUsed: "2024-02-28" }
  ]);

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
  
  const handle2FAEnable = () => {
    setShow2FADialog(true);
    setShow2FAStep("password");
  };
  
  const handle2FAPasswordSubmit = () => {
    setShow2FAStep("qr");
  };
  
  const handle2FAVerify = () => {
    setIs2FAEnabled(true);
    setShow2FADialog(false);
    toast({
      title: "2FA Enabled",
      description: "Two-factor authentication has been successfully enabled."
    });
  };
  
  const handle2FADisable = () => {
    setIs2FAEnabled(false);
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled.",
      variant: "destructive"
    });
  };
  
  const handleConnectAccount = (provider: string) => {
    setConnectedAccounts({ ...connectedAccounts, [provider]: true });
    toast({
      title: "Account Connected",
      description: `Your ${provider} account has been connected.`
    });
  };
  
  const handleDisconnectAccount = (provider: string) => {
    setConnectedAccounts({ ...connectedAccounts, [provider]: false });
    toast({
      title: "Account Disconnected",
      description: `Your ${provider} account has been disconnected.`
    });
  };
  
  const handleAddPasskey = () => {
    const newPasskey = {
      id: String(passkeys.length + 1),
      name: formData.passkeyName,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: "Never"
    };
    setPasskeys([...passkeys, newPasskey]);
    setShowAddPasskeyDialog(false);
    setFormData({ ...formData, passkeyName: "" });
    toast({
      title: "Passkey Added",
      description: "Your new passkey has been registered."
    });
  };
  
  const handleDeletePasskey = () => {
    setPasskeys(passkeys.filter(p => p.id !== selectedPasskey));
    setShowDeletePasskeyDialog(false);
    toast({
      title: "Passkey Deleted",
      description: "The passkey has been removed from your account."
    });
  };
  
  const handleDeleteAccount = () => {
    if (formData.deleteConfirmation === "DELETE") {
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive"
      });
      setShowDeleteAccountDialog(false);
    }
  };
  
  const sidebarSections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "connected", label: "Connected Accounts", icon: ExternalLink },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "billing", label: "Billing & Transactions", icon: CreditCard },
    { id: "courses", label: "My Learning", icon: BookOpen },
    { id: "saved", label: "Saved Content", icon: Bookmark },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Account Settings", icon: AlertTriangle }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account, security, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {sidebarSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-smooth ${
                          activeSection === section.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and avatar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        <img src={mockUser.avatar} alt={mockUser.name} className="w-full h-full object-cover" />
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                        disabled={!isEditing}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="font-semibold">{mockUser.name}</h3>
                      <p className="text-sm text-muted-foreground">Member since {mockUser.joinDate}</p>
                      {!isEditing && (
                        <Button variant="link" className="h-auto p-0 mt-1" onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                      <p className="text-xs text-muted-foreground">This email is used for login and notifications</p>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>

                    <Button>Update Password</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-5 h-5" />
                          <span className="font-medium">Authenticator App</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {is2FAEnabled ? "2FA is currently enabled" : "Use an app to generate verification codes"}
                        </p>
                      </div>
                      {is2FAEnabled ? (
                        <Button variant="destructive" onClick={handle2FADisable}>Disable</Button>
                      ) : (
                        <Button onClick={handle2FAEnable}>Enable</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Fingerprint className="w-5 h-5" />
                      Passkeys
                    </CardTitle>
                    <CardDescription>Manage your passkeys for passwordless sign-in</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {passkeys.map((passkey) => (
                      <div key={passkey.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{passkey.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Created {passkey.createdAt} • Last used {passkey.lastUsed}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedPasskey(passkey.id);
                            setShowDeletePasskeyDialog(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => setShowAddPasskeyDialog(true)}>
                      <Key className="w-4 h-4 mr-2" />
                      Add New Passkey
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Connected Accounts Section */}
            {activeSection === "connected" && (
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Link your social accounts for easier sign-in</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(connectedAccounts).map(([provider, isConnected]) => (
                    <div key={provider} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          provider === "google" ? "bg-red-100" :
                          provider === "facebook" ? "bg-blue-100" :
                          "bg-gray-100"
                        }`}>
                          <span className="text-lg font-bold capitalize">{provider[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold capitalize">{provider}</h4>
                          <p className="text-sm text-muted-foreground">
                            {isConnected ? "Connected" : "Not connected"}
                          </p>
                        </div>
                      </div>
                      {isConnected ? (
                        <Button variant="outline" onClick={() => handleDisconnectAccount(provider)}>
                          Disconnect
                        </Button>
                      ) : (
                        <Button onClick={() => handleConnectAccount(provider)}>Connect</Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

              {/* Billing Section */}
              {activeSection === "billing" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Billing & Transactions</CardTitle>
                    <CardDescription>View your transaction history and manage billing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Button 
                        variant="outline" 
                        className="w-full sm:w-auto"
                        onClick={() => window.open('https://polar.sh/customer-portal', '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Access Customer Portal
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Manage your subscriptions, payment methods, and invoices on Polar.sh
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Transaction ID</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Concept</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockTransactions.map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell className="font-medium">{transaction.id}</TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.concept}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>
                                  <Badge variant="secondary">{transaction.status}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Subscription Section */}
              {activeSection === "subscription" && (

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
            )}

            {/* My Courses Section */}
            {activeSection === "courses" && (
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
            )}

            {/* Saved Content Section */}
            {activeSection === "saved" && (
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
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
                      </div>
                      <Switch
                        id="marketing"
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="course-updates">Course Updates</Label>
                        <p className="text-sm text-muted-foreground">Get notified about new lessons and content</p>
                      </div>
                      <Switch
                        id="course-updates"
                        checked={notifications.courseUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, courseUpdates: checked })}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="comments">Comments & Replies</Label>
                        <p className="text-sm text-muted-foreground">Get notified when someone replies to your comments</p>
                      </div>
                      <Switch
                        id="comments"
                        checked={notifications.comments}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, comments: checked })}
                      />
                    </div>
                  </div>

                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            )}

            {/* Danger Zone Section */}
            {activeSection === "danger" && (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Irreversible actions that affect your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-destructive rounded-lg">
                    <h4 className="font-semibold mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. This will permanently delete your profile,
                      courses progress, and all associated data.
                    </p>
                    <Button variant="destructive" onClick={() => setShowDeleteAccountDialog(true)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete My Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 2FA Enable Dialog */}
        <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {show2FAStep === "password" && "Confirm Your Password"}
                {show2FAStep === "qr" && "Scan QR Code"}
                {show2FAStep === "verify" && "Verify Code"}
              </DialogTitle>
              <DialogDescription>
                {show2FAStep === "password" && "Please enter your password to continue"}
                {show2FAStep === "qr" && "Scan this QR code with your authenticator app"}
                {show2FAStep === "verify" && "Enter the 6-digit code from your authenticator app"}
              </DialogDescription>
            </DialogHeader>

            {show2FAStep === "password" && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="2fa-password">Password</Label>
                  <Input
                    id="2fa-password"
                    type="password"
                    value={formData.twoFAPassword}
                    onChange={(e) => setFormData({ ...formData, twoFAPassword: e.target.value })}
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            )}

            {show2FAStep === "qr" && (
              <div className="space-y-4 py-4">
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-sm text-muted-foreground text-center px-4">QR Code Placeholder</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Manual entry code:</p>
                  <code className="block bg-muted px-4 py-2 rounded-md text-sm">
                    ABCD EFGH IJKL MNOP
                  </code>
                </div>
              </div>
            )}

            {show2FAStep === "verify" && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="2fa-code">Verification Code</Label>
                  <Input
                    id="2fa-code"
                    value={formData.twoFACode}
                    onChange={(e) => setFormData({ ...formData, twoFACode: e.target.value })}
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              {show2FAStep === "password" && (
                <Button onClick={handle2FAPasswordSubmit}>Continue</Button>
              )}
              {show2FAStep === "qr" && (
                <Button onClick={() => setShow2FAStep("verify")}>Next</Button>
              )}
              {show2FAStep === "verify" && (
                <Button onClick={handle2FAVerify}>Enable 2FA</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Passkey Dialog */}
        <Dialog open={showAddPasskeyDialog} onOpenChange={setShowAddPasskeyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Passkey</DialogTitle>
              <DialogDescription>
                Give your passkey a name to identify this device
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="passkey-name">Device Name</Label>
                <Input
                  id="passkey-name"
                  value={formData.passkeyName}
                  onChange={(e) => setFormData({ ...formData, passkeyName: e.target.value })}
                  placeholder="e.g., My MacBook"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddPasskeyDialog(false)}>Cancel</Button>
              <Button onClick={handleAddPasskey}>Register Passkey</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Passkey Dialog */}
        <AlertDialog open={showDeletePasskeyDialog} onOpenChange={setShowDeletePasskeyDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Passkey</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this passkey? You won't be able to use it to sign in anymore.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeletePasskey} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Account Dialog */}
        <AlertDialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive">Delete Account Permanently</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Label htmlFor="delete-confirmation">Type DELETE to confirm</Label>
              <Input
                id="delete-confirmation"
                value={formData.deleteConfirmation}
                onChange={(e) => setFormData({ ...formData, deleteConfirmation: e.target.value })}
                placeholder="DELETE"
                className="mt-2"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={formData.deleteConfirmation !== "DELETE"}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
