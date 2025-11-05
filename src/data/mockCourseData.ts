export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  completed: boolean;
  resources?: Resource[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  unlocked: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'document' | 'spreadsheet';
  url: string;
  size: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  image: string;
  affiliateUrl: string;
  price: string;
  priority: 'essential' | 'recommended' | 'optional';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  totalDuration: string;
  progress: number;
  modules: Module[];
  resources: Resource[];
  equipment: Equipment[];
}

export const mockCourse: Course = {
  id: "1",
  title: "Natural Hypertrophy Program",
  description: "12-week science-based program for maximum muscle growth",
  instructor: "Dr. Mike Natural",
  totalDuration: "8h 30m",
  progress: 25,
  modules: [
    {
      id: "module-1",
      title: "Foundation Phase (Weeks 1-4)",
      description: "Master the fundamentals and build your training foundation",
      unlocked: true,
      lessons: [
        {
          id: "lesson-1-1",
          title: "Program Overview & How to Use This Course",
          duration: "12:45",
          videoUrl: "https://example.com/video1",
          description: "Learn how to navigate the program and maximize your results",
          completed: true,
          resources: [
            {
              id: "res-1",
              title: "Program Calendar",
              type: "pdf",
              url: "#",
              size: "2.3 MB"
            }
          ]
        },
        {
          id: "lesson-1-2",
          title: "Proper Warm-up Protocols",
          duration: "15:20",
          videoUrl: "https://example.com/video2",
          description: "Essential warm-up routines to prevent injury and optimize performance",
          completed: true
        },
        {
          id: "lesson-1-3",
          title: "Week 1-4 Training Split Breakdown",
          duration: "18:30",
          videoUrl: "https://example.com/video3",
          description: "Detailed explanation of your first month training structure",
          completed: false
        },
        {
          id: "lesson-1-4",
          title: "Compound Movement Techniques - Squat",
          duration: "25:15",
          videoUrl: "https://example.com/video4",
          description: "Master the king of exercises with perfect form",
          completed: false
        },
        {
          id: "lesson-1-5",
          title: "Compound Movement Techniques - Bench Press",
          duration: "22:40",
          videoUrl: "https://example.com/video5",
          description: "Build a bigger chest with proper pressing mechanics",
          completed: false
        }
      ]
    },
    {
      id: "module-2",
      title: "Volume Accumulation (Weeks 5-8)",
      description: "Increase training volume for maximum muscle growth",
      unlocked: false,
      lessons: [
        {
          id: "lesson-2-1",
          title: "Understanding Progressive Overload",
          duration: "16:20",
          videoUrl: "https://example.com/video6",
          description: "The science behind continuous strength gains",
          completed: false
        },
        {
          id: "lesson-2-2",
          title: "Advanced Isolation Techniques",
          duration: "28:15",
          videoUrl: "https://example.com/video7",
          description: "Target specific muscle groups for hypertrophy",
          completed: false
        }
      ]
    },
    {
      id: "module-3",
      title: "Intensity Phase (Weeks 9-11)",
      description: "Push your limits with high-intensity training",
      unlocked: false,
      lessons: [
        {
          id: "lesson-3-1",
          title: "Intensity Techniques & Advanced Methods",
          duration: "24:30",
          videoUrl: "https://example.com/video8",
          description: "Drop sets, rest-pause, and more",
          completed: false
        }
      ]
    },
    {
      id: "module-4",
      title: "Deload & Recovery (Week 12)",
      description: "Strategic recovery for long-term progress",
      unlocked: false,
      lessons: [
        {
          id: "lesson-4-1",
          title: "The Importance of Deloading",
          duration: "14:25",
          videoUrl: "https://example.com/video9",
          description: "Why backing off leads to better gains",
          completed: false
        }
      ]
    }
  ],
  resources: [
    {
      id: "res-global-1",
      title: "Complete 12-Week Training Log",
      type: "spreadsheet",
      url: "#",
      size: "1.2 MB"
    },
    {
      id: "res-global-2",
      title: "Nutrition Guide for Natural Athletes",
      type: "pdf",
      url: "#",
      size: "5.8 MB"
    },
    {
      id: "res-global-3",
      title: "Exercise Library (100+ Movements)",
      type: "pdf",
      url: "#",
      size: "12.4 MB"
    },
    {
      id: "res-global-4",
      title: "Meal Prep Templates",
      type: "pdf",
      url: "#",
      size: "3.1 MB"
    },
    {
      id: "res-global-5",
      title: "Recovery & Mobility Routines",
      type: "video",
      url: "#",
      size: "145 MB"
    }
  ],
  equipment: [
    {
      id: "eq-1",
      name: "Adjustable Dumbbells (5-50lbs)",
      description: "Essential for progressive overload. Quality adjustable set for home training.",
      image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&q=80",
      affiliateUrl: "https://amazon.com/example1",
      price: "$299",
      priority: "essential"
    },
    {
      id: "eq-2",
      name: "Power Rack with Pull-Up Bar",
      description: "Core equipment for compound movements. Safety spotter arms included.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
      affiliateUrl: "https://amazon.com/example2",
      price: "$599",
      priority: "essential"
    },
    {
      id: "eq-3",
      name: "Olympic Barbell (45lbs)",
      description: "Standard Olympic bar for all compound lifts.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
      affiliateUrl: "https://amazon.com/example3",
      price: "$179",
      priority: "essential"
    },
    {
      id: "eq-4",
      name: "Bumper Plate Set (230lbs)",
      description: "Durable rubber plates. Perfect for home gym setup.",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80",
      affiliateUrl: "https://amazon.com/example4",
      price: "$399",
      priority: "essential"
    },
    {
      id: "eq-5",
      name: "Adjustable Weight Bench",
      description: "Flat, incline, and decline positions for maximum versatility.",
      image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=80",
      affiliateUrl: "https://amazon.com/example5",
      price: "$249",
      priority: "recommended"
    },
    {
      id: "eq-6",
      name: "Resistance Bands Set",
      description: "Great for warm-ups and accessory work.",
      image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80",
      affiliateUrl: "https://amazon.com/example6",
      price: "$29",
      priority: "recommended"
    },
    {
      id: "eq-7",
      name: "Foam Roller",
      description: "Essential for recovery and mobility work.",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80",
      affiliateUrl: "https://amazon.com/example7",
      price: "$24",
      priority: "recommended"
    },
    {
      id: "eq-8",
      name: "Lifting Straps",
      description: "Improve grip strength on heavy pulling movements.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
      affiliateUrl: "https://amazon.com/example8",
      price: "$15",
      priority: "optional"
    }
  ]
};
