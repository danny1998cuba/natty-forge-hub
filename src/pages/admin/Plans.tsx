import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Users, DollarSign, Check, Edit, Trash } from "lucide-react";
import { mockPlans, type Plan } from "@/data/mockAdminData";
import { useToast } from "@/hooks/use-toast";

export default function Plans() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deletePlan, setDeletePlan] = useState<Plan | null>(null);

  const handleDelete = () => {
    if (deletePlan) {
      toast({
        title: "Plan deleted",
        description: `${deletePlan.name} plan has been removed.`,
      });
      setDeletePlan(null);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Plans Management</h2>
          <p className="text-muted-foreground">Manage subscription plans and pricing</p>
        </div>
        <Button onClick={() => navigate("/admin/plans/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPlans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>
                  {plan.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{plan.subscribers} subscribers</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${plan.price * plan.subscribers}/mo</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <p className="font-medium text-sm">Features:</p>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate(`/admin/plans/${plan.id}/edit`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setDeletePlan(plan)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deletePlan} onOpenChange={() => setDeletePlan(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the <strong>{deletePlan?.name}</strong> plan? This will affect{" "}
              <strong>{deletePlan?.subscribers} active subscribers</strong>. They will need to be migrated to another plan. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
