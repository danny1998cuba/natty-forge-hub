import { cn } from "@/lib/utils";

type AdSize = "banner" | "leaderboard" | "sidebar" | "inline" | "native";

interface AdPlaceholderProps {
  size?: AdSize;
  className?: string;
  label?: string;
}

const sizeStyles: Record<AdSize, string> = {
  banner: "h-[90px] w-full max-w-[728px]", // 728x90 leaderboard
  leaderboard: "h-[250px] w-full max-w-[970px]", // 970x250 billboard
  sidebar: "h-[250px] w-[300px]", // 300x250 medium rectangle
  inline: "h-[100px] w-full", // Full-width inline
  native: "min-h-[120px] w-full", // Native content style
};

export const AdPlaceholder = ({ 
  size = "inline", 
  className,
  label = "Advertisement"
}: AdPlaceholderProps) => {
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-lg border border-dashed border-border/50 bg-muted/20",
        sizeStyles[size],
        className
      )}
    >
      <div className="text-center">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">
          {label}
        </span>
      </div>
      {/* Slot ID for ad network integration */}
      <div 
        data-ad-slot={`ad-${size}`}
        data-ad-format={size}
        className="absolute inset-0"
      />
    </div>
  );
};
