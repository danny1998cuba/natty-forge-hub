import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InlineSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  compact?: boolean;
}

export const InlineSearch = ({ 
  placeholder = "Search...", 
  value, 
  onChange,
  className,
  compact = false
}: InlineSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // For mobile/compact view, show expandable search
  if (compact) {
    return (
      <div className={cn("relative", className)}>
        {isExpanded ? (
          <div className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-200">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-9 pr-9 h-9 border-border bg-background"
                autoFocus
              />
              {value && (
                <button
                  onClick={() => onChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsExpanded(false);
                onChange("");
              }}
              className="shrink-0"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(true)}
            className="h-9 w-9"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  // Default full search input
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9 border-border bg-background"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
