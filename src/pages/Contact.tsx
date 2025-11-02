import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We'd love to hear from you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="gradient-card border-border p-6 text-center">
              <Mail className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">contact@currentlynatty.com</p>
            </Card>
            <Card className="gradient-card border-border p-6 text-center">
              <MessageSquare className="h-10 w-10 text-secondary mx-auto mb-3" />
              <h3 className="mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">Join our forum discussions</p>
            </Card>
            <Card className="gradient-card border-border p-6 text-center">
              <Send className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="mb-2">Social Media</h3>
              <p className="text-sm text-muted-foreground">@currentlynatty</p>
            </Card>
          </div>

          <Card className="gradient-card border-border p-8 max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us what's on your mind..." 
                  rows={6}
                />
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
