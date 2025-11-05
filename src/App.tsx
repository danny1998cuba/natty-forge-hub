import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { AdminLayout } from "@/components/AdminLayout";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Workouts from "./pages/Workouts";
import WorkoutDetails from "./pages/WorkoutDetails";
import CourseViewer from "./pages/CourseViewer";
import Store from "./pages/Store";
import ProductDetails from "./pages/ProductDetails";
import Community from "./pages/Community";
import CommunityHub from "./pages/CommunityHub";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import Plans from "./pages/admin/Plans";
import BlogManagement from "./pages/admin/BlogManagement";
import CommunityManagement from "./pages/admin/CommunityManagement";
import Settings from "./pages/admin/Settings";
import CreateUser from "./pages/admin/users/CreateUser";
import EditUser from "./pages/admin/users/EditUser";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import CreatePlan from "./pages/admin/plans/CreatePlan";
import EditPlan from "./pages/admin/plans/EditPlan";
import CreateBlogPost from "./pages/admin/blog/CreateBlogPost";
import EditBlogPost from "./pages/admin/blog/EditBlogPost";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:id" element={<WorkoutDetails />} />
          <Route path="/course/:id" element={<CourseViewer />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<ProductDetails />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/hub" element={<CommunityHub />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/:id/edit" element={<EditUser />} />
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="plans" element={<Plans />} />
            <Route path="plans/create" element={<CreatePlan />} />
            <Route path="plans/:id/edit" element={<EditPlan />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="blog/create" element={<CreateBlogPost />} />
            <Route path="blog/:id/edit" element={<EditBlogPost />} />
            <Route path="community" element={<CommunityManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
