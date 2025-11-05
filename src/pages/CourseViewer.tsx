import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Lock,
  Download,
  FileText,
  Video,
  Sheet,
  ChevronDown,
  ExternalLink,
  ShoppingCart,
  AlertCircle
} from "lucide-react";
import { mockCourse, type Lesson, type Module } from "@/data/mockCourseData";

const CourseViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(mockCourse.modules[0].lessons[0]);
  const [openModules, setOpenModules] = useState<string[]>(["module-1"]);

  const course = mockCourse;

  const toggleModule = (moduleId: string) => {
    setOpenModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const selectLesson = (lesson: Lesson, module: Module) => {
    if (module.unlocked) {
      setCurrentLesson(lesson);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'spreadsheet':
        return <Sheet className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'essential':
        return 'destructive';
      case 'recommended':
        return 'default';
      case 'optional':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Course Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/workouts')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Exit Course
                </Button>
                <div>
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-sm text-muted-foreground">with {course.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-sm text-muted-foreground">Course Progress</p>
                  <div className="flex items-center gap-2">
                    <Progress value={course.progress} className="w-32" />
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6 py-6">
            {/* Sidebar - Course Content */}
            <div className="lg:col-span-1">
              <Card className="gradient-card border-border">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">Course Content</h3>
                  <p className="text-sm text-muted-foreground">{course.totalDuration} total</p>
                </div>
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="p-2">
                    {course.modules.map((module) => (
                      <Collapsible
                        key={module.id}
                        open={openModules.includes(module.id)}
                        onOpenChange={() => toggleModule(module.id)}
                        className="mb-2"
                      >
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-smooth group">
                            <div className="flex items-center gap-2 flex-1 text-left">
                              {module.unlocked ? (
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium line-clamp-2">{module.title}</p>
                                <p className="text-xs text-muted-foreground">{module.lessons.length} lessons</p>
                              </div>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform ${openModules.includes(module.id) ? 'rotate-180' : ''}`} />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="ml-4 mt-1 space-y-1">
                            {module.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => selectLesson(lesson, module)}
                                disabled={!module.unlocked}
                                className={`w-full text-left p-2 rounded-md text-sm transition-smooth hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed ${
                                  currentLesson.id === lesson.id ? 'bg-accent' : ''
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {lesson.completed ? (
                                    <CheckCircle className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <Play className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="line-clamp-2 text-xs leading-relaxed">{lesson.title}</p>
                                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Video Player */}
              <Card className="gradient-card border-border overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Video Player Placeholder</p>
                    <p className="text-sm text-muted-foreground mt-1">{currentLesson.title}</p>
                  </div>
                </div>
              </Card>

              {/* Lesson Details */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
                    <p className="text-muted-foreground">{currentLesson.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {currentLesson.completed ? 'Completed' : 'Mark Complete'}
                  </Button>
                </div>

                {/* Tabbed Content */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <Card className="gradient-card border-border p-6">
                      <h3 className="font-semibold mb-4">About This Lesson</h3>
                      <p className="text-muted-foreground mb-6">{currentLesson.description}</p>
                      
                      {currentLesson.resources && currentLesson.resources.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Lesson Resources</h4>
                          <div className="space-y-2">
                            {currentLesson.resources.map((resource) => (
                              <div
                                key={resource.id}
                                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-smooth"
                              >
                                <div className="flex items-center gap-3">
                                  {getResourceIcon(resource.type)}
                                  <div>
                                    <p className="text-sm font-medium">{resource.title}</p>
                                    <p className="text-xs text-muted-foreground">{resource.size}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="resources" className="mt-6">
                    <Card className="gradient-card border-border p-6">
                      <div className="flex items-start gap-2 mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Course Resources</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Download all program materials including nutrition guides, workout logs, and more.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {course.resources.map((resource) => (
                          <div
                            key={resource.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary transition-smooth group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                {getResourceIcon(resource.type)}
                              </div>
                              <div>
                                <p className="font-medium">{resource.title}</p>
                                <p className="text-sm text-muted-foreground">{resource.size}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="equipment" className="mt-6">
                    <div className="space-y-6">
                      {/* Essential Equipment */}
                      <Card className="gradient-card border-border p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="destructive">Essential</Badge>
                          <h3 className="font-semibold">Required Equipment</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {course.equipment
                            .filter(eq => eq.priority === 'essential')
                            .map((item) => (
                              <div
                                key={item.id}
                                className="border border-border rounded-lg overflow-hidden hover:border-primary transition-smooth group"
                              >
                                <div className="aspect-video overflow-hidden bg-muted">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                                  />
                                </div>
                                <div className="p-4">
                                  <h4 className="font-medium mb-1">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {item.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">{item.price}</span>
                                    <Button variant="outline" size="sm" asChild>
                                      <a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer">
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        View
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </Card>

                      {/* Recommended Equipment */}
                      <Card className="gradient-card border-border p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="default">Recommended</Badge>
                          <h3 className="font-semibold">Recommended Add-ons</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {course.equipment
                            .filter(eq => eq.priority === 'recommended')
                            .map((item) => (
                              <div
                                key={item.id}
                                className="border border-border rounded-lg overflow-hidden hover:border-primary transition-smooth group"
                              >
                                <div className="aspect-video overflow-hidden bg-muted">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                                  />
                                </div>
                                <div className="p-4">
                                  <h4 className="font-medium mb-1">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                    {item.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">{item.price}</span>
                                    <Button variant="outline" size="sm" asChild>
                                      <a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer">
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        View
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                      </a>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </Card>

                      {/* Optional Equipment */}
                      {course.equipment.some(eq => eq.priority === 'optional') && (
                        <Card className="gradient-card border-border p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary">Optional</Badge>
                            <h3 className="font-semibold">Optional Upgrades</h3>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            {course.equipment
                              .filter(eq => eq.priority === 'optional')
                              .map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-4 border border-border rounded-lg p-4 hover:border-primary transition-smooth"
                                >
                                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium mb-1 line-clamp-1">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                      {item.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-primary">{item.price}</span>
                                      <Button variant="ghost" size="sm" asChild>
                                        <a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer">
                                          View <ExternalLink className="h-3 w-3 ml-1" />
                                        </a>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
