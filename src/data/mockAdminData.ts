// Mock data for admin dashboard prototype

export type UserRole = 'admin' | 'editor' | 'moderator' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  joinedDate: string;
  lastActive: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'draft';
  image: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  subscribers: number;
  status: 'active' | 'inactive';
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: 'published' | 'draft';
  publishedDate: string;
  views: number;
  category: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  status: 'approved' | 'pending' | 'flagged';
  createdAt: string;
}

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', joinedDate: '2024-01-15', lastActive: '2024-03-10' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'editor', status: 'active', joinedDate: '2024-02-20', lastActive: '2024-03-09' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'moderator', status: 'active', joinedDate: '2024-03-01', lastActive: '2024-03-08' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'user', status: 'active', joinedDate: '2024-03-05', lastActive: '2024-03-10' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', role: 'user', status: 'inactive', joinedDate: '2024-01-10', lastActive: '2024-02-15' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Protein Powder', description: 'High-quality whey protein', price: 49.99, category: 'Supplements', stock: 150, status: 'active', image: '/placeholder.svg' },
  { id: '2', name: 'Resistance Bands', description: 'Set of 5 resistance bands', price: 29.99, category: 'Equipment', stock: 200, status: 'active', image: '/placeholder.svg' },
  { id: '3', name: 'Yoga Mat', description: 'Premium non-slip yoga mat', price: 39.99, category: 'Equipment', stock: 75, status: 'active', image: '/placeholder.svg' },
  { id: '4', name: 'Pre-Workout', description: 'Energy-boosting supplement', price: 34.99, category: 'Supplements', stock: 100, status: 'draft', image: '/placeholder.svg' },
];

export const mockPlans: Plan[] = [
  { id: '1', name: 'Basic Plan', description: 'Perfect for beginners', price: 29, duration: 'month', features: ['Access to workouts', 'Basic nutrition guide', 'Email support'], subscribers: 145, status: 'active' },
  { id: '2', name: 'Pro Plan', description: 'For serious athletes', price: 59, duration: 'month', features: ['All Basic features', 'Custom workout plans', 'Priority support', 'Meal planning'], subscribers: 89, status: 'active' },
  { id: '3', name: 'Elite Plan', description: 'Complete transformation', price: 99, duration: 'month', features: ['All Pro features', '1-on-1 coaching', 'Weekly video calls', 'Supplement guidance'], subscribers: 34, status: 'active' },
];

export const mockBlogPosts: BlogPost[] = [
  { id: '1', title: '10 Tips for Building Muscle', author: 'John Doe', status: 'published', publishedDate: '2024-03-01', views: 1245, category: 'Training' },
  { id: '2', title: 'The Science of Protein Intake', author: 'Jane Smith', status: 'published', publishedDate: '2024-03-05', views: 890, category: 'Nutrition' },
  { id: '3', title: 'Recovery Techniques for Athletes', author: 'John Doe', status: 'draft', publishedDate: '2024-03-10', views: 0, category: 'Recovery' },
  { id: '4', title: 'Mindset Mastery Guide', author: 'Jane Smith', status: 'published', publishedDate: '2024-02-28', views: 2100, category: 'Mindset' },
];

export const mockCommunityPosts: CommunityPost[] = [
  { id: '1', author: 'Sarah Williams', content: 'Just hit my PR on deadlifts! 300lbs! 💪', likes: 45, comments: 12, status: 'approved', createdAt: '2024-03-10 09:30' },
  { id: '2', author: 'Tom Brown', content: 'Looking for workout partners in LA area', likes: 23, comments: 8, status: 'approved', createdAt: '2024-03-10 08:15' },
  { id: '3', author: 'Mike Johnson', content: 'Check out this suspicious link...', likes: 2, comments: 1, status: 'flagged', createdAt: '2024-03-10 07:45' },
  { id: '4', author: 'Jane Smith', content: 'New article on nutrition coming tomorrow!', likes: 67, comments: 15, status: 'approved', createdAt: '2024-03-09 18:20' },
];

// Current mock admin user (simulate logged-in state)
export const mockCurrentAdmin = {
  id: '1',
  name: 'Admin User',
  email: 'admin@currentlynatty.com',
  role: 'admin' as UserRole,
};
