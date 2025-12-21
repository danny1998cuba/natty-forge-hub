import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Dumbbell, ShoppingBag, MessageSquare, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResult {
  id: string;
  type: "post" | "workout" | "product" | "thread";
  title: string;
  subtitle?: string;
  url: string;
}

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock search function - ready to be replaced with vector search API
const mockSearch = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const mockResults: SearchResult[] = [
    { id: "p1", type: "post", title: "The Science of Natural Muscle Building", subtitle: "Training • 8 min read", url: "/blog/1" },
    { id: "p2", type: "post", title: "Nutrition Secrets for Natural Gains", subtitle: "Nutrition • 15 min read", url: "/blog/3" },
    { id: "w1", type: "workout", title: "Natural Hypertrophy Program", subtitle: "Intermediate • 12 weeks", url: "/workouts/1" },
    { id: "w2", type: "workout", title: "Strength Foundation", subtitle: "Beginner • 8 weeks", url: "/workouts/2" },
    { id: "pr1", type: "product", title: "Currently Natty T-Shirt", subtitle: "$29.99", url: "/store/1" },
    { id: "pr2", type: "product", title: "Training Hoodie", subtitle: "$49.99", url: "/store/3" },
    { id: "t1", type: "thread", title: "Just hit a new PR on bench press!", subtitle: "23 replies", url: "/community" },
    { id: "t2", type: "thread", title: "Best protein sources for bulking season?", subtitle: "18 replies", url: "/community" },
  ];

  const lowerQuery = query.toLowerCase();
  return mockResults.filter(r => 
    r.title.toLowerCase().includes(lowerQuery) || 
    r.subtitle?.toLowerCase().includes(lowerQuery)
  );
};

const typeIcons = {
  post: FileText,
  workout: Dumbbell,
  product: ShoppingBag,
  thread: MessageSquare,
};

const typeLabels = {
  post: "Blog Post",
  workout: "Workout",
  product: "Product",
  thread: "Thread",
};

const typeColors = {
  post: "border-primary text-primary",
  workout: "border-secondary text-secondary",
  product: "border-accent text-accent-foreground",
  thread: "border-muted text-muted-foreground",
};

export const GlobalSearch = ({ open, onOpenChange }: GlobalSearchProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const data = await mockSearch(query);
        setResults(data);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(search, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    onOpenChange(false);
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) acc[result.type] = [];
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, workouts, products, threads..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 border-border bg-background"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] p-4 pt-2">
          {isLoading && (
            <p className="text-sm text-muted-foreground text-center py-8">Searching...</p>
          )}
          
          {!isLoading && query && results.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              No results found for "{query}"
            </p>
          )}

          {!isLoading && !query && (
            <div className="text-sm text-muted-foreground text-center py-8">
              <p>Start typing to search across all content</p>
              <p className="text-xs mt-2">Posts, workouts, products & community threads</p>
            </div>
          )}

          {!isLoading && Object.entries(groupedResults).map(([type, items]) => {
            const Icon = typeIcons[type as keyof typeof typeIcons];
            return (
              <div key={type} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <Icon className="h-3 w-3" />
                  {typeLabels[type as keyof typeof typeLabels]}s
                </div>
                <div className="space-y-1">
                  {items.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className="w-full text-left p-3 rounded-lg hover:bg-accent transition-smooth flex items-center gap-3 group"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate group-hover:text-primary transition-smooth">
                          {result.title}
                        </p>
                        {result.subtitle && (
                          <p className="text-xs text-muted-foreground truncate">
                            {result.subtitle}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className={`text-xs ${typeColors[result.type]}`}>
                        {typeLabels[result.type]}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </ScrollArea>

        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Esc</kbd> to close</span>
          <span>Powered by semantic search</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
