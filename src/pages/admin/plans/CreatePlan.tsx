import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const planFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  billingPeriod: z.enum(["monthly", "yearly"]),
  features: z.string().min(10, "Please list at least a few features"),
  status: z.enum(["active", "inactive"]),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

export default function CreatePlan() {
  const navigate = useNavigate();
  
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      billingPeriod: "monthly",
      features: "",
      status: "active",
    },
  });

  function onSubmit(data: PlanFormValues) {
    console.log(data);
    toast.success("Plan created successfully!");
    navigate("/admin/plans");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/plans")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Plan</h1>
          <p className="text-muted-foreground">Add a new subscription plan</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
          <CardDescription>Fill in the information below to create a new subscription plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Premium Plan" {...field} />
                    </FormControl>
                    <FormDescription>A clear name for your subscription plan</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe what this plan offers..." 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>Brief overview of the plan benefits</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="29.99" {...field} />
                      </FormControl>
                      <FormDescription>Price per billing period</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="billingPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Period</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How often users are billed</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List plan features, one per line..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>List all features included in this plan</FormDescription>
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Whether the plan is available for subscription</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit">Create Plan</Button>
                <Button type="button" variant="outline" onClick={() => navigate("/admin/plans")}>
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
