import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActionLinkEmailPreview, getActionLinkEmailHTML } from "@/components/email-templates/ActionLinkEmail";
import { Copy, Check, Eye, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmailTemplates() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    userName: "Athlete",
    actionTitle: "Verify Your Email",
    actionDescription: "Click the button below to verify your email address and complete your registration with Currently Natty.",
    buttonText: "Verify Email",
    buttonLink: "https://currentlynatty.com/verify?token=abc123xyz",
    footerNote: "If you didn't request this, you can safely ignore this email."
  });

  const handleCopyHTML = () => {
    const html = getActionLinkEmailHTML(formData);
    navigator.clipboard.writeText(html);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Email HTML copied to clipboard"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const presetTemplates = [
    {
      name: "Email Verification",
      data: {
        userName: "Athlete",
        actionTitle: "Verify Your Email",
        actionDescription: "Click the button below to verify your email address and complete your registration with Currently Natty.",
        buttonText: "Verify Email",
        buttonLink: "https://currentlynatty.com/verify?token=abc123",
        footerNote: "If you didn't request this, you can safely ignore this email."
      }
    },
    {
      name: "Password Reset",
      data: {
        userName: "Athlete",
        actionTitle: "Reset Your Password",
        actionDescription: "We received a request to reset your password. Click the button below to create a new password. This link expires in 1 hour.",
        buttonText: "Reset Password",
        buttonLink: "https://currentlynatty.com/reset-password?token=xyz789",
        footerNote: "If you didn't request a password reset, please ignore this email or contact support."
      }
    },
    {
      name: "Welcome Email",
      data: {
        userName: "Athlete",
        actionTitle: "Welcome to Currently Natty! 💪",
        actionDescription: "You're now part of the Currently Natty community. Start your fitness journey by exploring our workouts and connecting with fellow athletes.",
        buttonText: "Start Training",
        buttonLink: "https://currentlynatty.com/workouts",
        footerNote: "We're excited to have you on board!"
      }
    },
    {
      name: "New Workout",
      data: {
        userName: "Athlete",
        actionTitle: "New Workout Just Dropped! 🔥",
        actionDescription: "A new workout has been added to your program. Check it out and push your limits to the next level.",
        buttonText: "View Workout",
        buttonLink: "https://currentlynatty.com/workouts/new",
        footerNote: "Keep grinding and stay natty!"
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Email Templates</h2>
        <p className="text-muted-foreground">Preview and customize email templates for user communications</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,1.5fr]">
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Presets */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {presetTemplates.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs h-auto py-2"
                    onClick={() => setFormData(preset.data)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customize Template</CardTitle>
              <CardDescription>Edit the email content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Recipient Name</Label>
                <Input
                  id="userName"
                  value={formData.userName}
                  onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                  placeholder="Athlete"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actionTitle">Email Title</Label>
                <Input
                  id="actionTitle"
                  value={formData.actionTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, actionTitle: e.target.value }))}
                  placeholder="Verify Your Email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actionDescription">Description</Label>
                <Textarea
                  id="actionDescription"
                  value={formData.actionDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, actionDescription: e.target.value }))}
                  placeholder="Click the button below..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={formData.buttonText}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                    placeholder="Verify Email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonLink: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerNote">Footer Note</Label>
                <Input
                  id="footerNote"
                  value={formData.footerNote}
                  onChange={(e) => setFormData(prev => ({ ...prev, footerNote: e.target.value }))}
                  placeholder="If you didn't request this..."
                />
              </div>

              <Button onClick={handleCopyHTML} className="w-full gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy HTML Template"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <Card>
          <CardHeader className="pb-3">
            <Tabs defaultValue="preview" className="w-full">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Email Preview</CardTitle>
                <TabsList className="h-8">
                  <TabsTrigger value="preview" className="text-xs gap-1 h-7">
                    <Eye className="w-3 h-3" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="text-xs gap-1 h-7">
                    <Code className="w-3 h-3" />
                    HTML
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="preview" className="mt-4">
                <ActionLinkEmailPreview {...formData} />
              </TabsContent>
              
              <TabsContent value="code" className="mt-4">
                <div className="relative">
                  <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto text-xs text-muted-foreground max-h-[600px] overflow-y-auto">
                    <code>{getActionLinkEmailHTML(formData)}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
