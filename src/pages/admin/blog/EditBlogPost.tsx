import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { mockBlogPosts } from "@/data/mockAdminData";

const blogPostFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters").max(300),
  content: z.string().min(50, "Content must be at least 50 characters").max(10000),
  author: z.string().min(2, "Author name is required").max(100),
  category: z.string().min(1, "Category is required"),
  featuredImage: z.string().url("Invalid image URL").optional().or(z.literal("")),
  status: z.enum(["draft", "published", "archived"]),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

export default function EditBlogPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const post = mockBlogPosts.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Blog Post Not Found</h1>
        </div>
      </div>
    );
  }

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      featuredImage: post.featuredImage || "",
      status: post.status,
    },
  });

  function onSubmit(data: BlogPostFormValues) {
    console.log(data);
    toast.success("Blog post updated successfully!");
    navigate("/admin/blog");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <p className="text-muted-foreground">Update blog post information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Update the information below to modify the blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="10 Best Exercises for Building Muscle" {...field} />
                    </FormControl>
                    <FormDescription>A compelling title for your blog post</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief summary of the post..." 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>Short preview text that appears in listings</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your blog post content here..." 
                        className="min-h-[300px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>The main content of your blog post</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>Post author name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Fitness Tips" {...field} />
                      </FormControl>
                      <FormDescription>Post category</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="featuredImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>URL to the featured image</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Publication status of the post</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="outline" onClick={() => navigate("/admin/blog")}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
