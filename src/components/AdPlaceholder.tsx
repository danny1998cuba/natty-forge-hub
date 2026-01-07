import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AdFormat = 
  | "banner"           // 728x90 leaderboard
  | "leaderboard"      // 970x250 billboard
  | "sidebar"          // 300x250 medium rectangle
  | "inline"           // Full-width inline
  | "native"           // Native content style
  | "blog-card"        // Matches blog post card style
  | "related-article"  // Matches related articles card style
  | "content-inline"   // For within blog content
  | "full-width"       // Edge-to-edge banner
  | "mobile-banner"    // Mobile-optimized banner
  | "sticky-footer";   // Sticky mobile footer ad

interface AdPlaceholderProps {
  format?: AdFormat;
  className?: string;
  label?: string;
  /** For blog-card format: mock category */
  category?: string;
  /** For blog-card format: mock read time */
  readTime?: string;
}

const formatStyles: Record<AdFormat, string> = {
  banner: "h-[90px] w-full max-w-[728px]",
  leaderboard: "h-[250px] w-full max-w-[970px]",
  sidebar: "h-[250px] w-[300px]",
  inline: "h-[100px] w-full",
  native: "min-h-[120px] w-full",
  "blog-card": "w-full",
  "related-article": "w-full",
  "content-inline": "h-[120px] w-full my-6",
  "full-width": "h-[90px] w-full md:h-[120px]",
  "mobile-banner": "h-[60px] w-full sm:h-[90px]",
  "sticky-footer": "h-[50px] w-full fixed bottom-0 left-0 right-0 z-40 md:hidden",
};

// Basic placeholder for simple formats
const BasicPlaceholder = ({ 
  format, 
  label, 
  className 
}: { 
  format: AdFormat; 
  label: string; 
  className?: string;
}) => (
  <div 
    className={cn(
      "relative flex items-center justify-center rounded-lg border border-dashed border-border/50 bg-muted/20",
      formatStyles[format],
      className
    )}
  >
    <div className="text-center">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">
        {label}
      </span>
    </div>
    <div 
      data-ad-slot={`ad-${format}`}
      data-ad-format={format}
      className="absolute inset-0"
    />
  </div>
);

// Blog card style ad - blends with blog post cards
const BlogCardAd = ({ className, category, readTime }: { className?: string; category?: string; readTime?: string }) => (
  <Card 
    className={cn(
      "gradient-card border-border overflow-hidden group relative",
      className
    )}
    data-ad-slot="ad-blog-card"
    data-ad-format="blog-card"
  >
    {/* Placeholder image area */}
    <div className="aspect-video bg-gradient-to-br from-muted/40 to-muted/20 flex items-center justify-center">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
        Sponsored Content
      </span>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground/60 text-[10px]">
          {category || "Sponsored"}
        </Badge>
        {readTime && (
          <span className="text-sm text-muted-foreground/50">{readTime}</span>
        )}
      </div>
      <div className="h-6 bg-muted/30 rounded mb-2 w-3/4" />
      <div className="h-4 bg-muted/20 rounded w-full mb-2" />
      <div className="h-4 bg-muted/20 rounded w-2/3" />
      <div className="mt-4 h-10 bg-muted/20 rounded-md w-32" />
    </div>
    <div className="absolute top-2 right-2">
      <span className="text-[8px] uppercase tracking-wider text-muted-foreground/30 bg-background/50 px-1.5 py-0.5 rounded">
        Ad
      </span>
    </div>
  </Card>
);

// Related article style ad - matches the smaller related posts cards
const RelatedArticleAd = ({ className }: { className?: string }) => (
  <Card 
    className={cn(
      "gradient-card border-border overflow-hidden group relative hover:border-primary/30 transition-all duration-300",
      className
    )}
    data-ad-slot="ad-related-article"
    data-ad-format="related-article"
  >
    <div className="aspect-video bg-gradient-to-br from-muted/40 to-muted/20 flex items-center justify-center">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
        Sponsored
      </span>
    </div>
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="text-xs border-muted-foreground/30 text-muted-foreground/50">
          Sponsored
        </Badge>
      </div>
      <div className="h-4 bg-muted/30 rounded w-full mb-1" />
      <div className="h-4 bg-muted/20 rounded w-3/4" />
    </div>
    <div className="absolute top-2 right-2">
      <span className="text-[8px] uppercase tracking-wider text-muted-foreground/30 bg-background/50 px-1.5 py-0.5 rounded">
        Ad
      </span>
    </div>
  </Card>
);

// Content inline ad - for within blog post content
const ContentInlineAd = ({ className }: { className?: string }) => (
  <div 
    className={cn(
      "relative rounded-lg border border-dashed border-border/30 bg-muted/10 p-4 my-6",
      className
    )}
    data-ad-slot="ad-content-inline"
    data-ad-format="content-inline"
  >
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full sm:w-24 h-20 sm:h-24 bg-muted/30 rounded-lg flex items-center justify-center shrink-0">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
          Image
        </span>
      </div>
      <div className="flex-1 text-center sm:text-left">
        <div className="h-4 bg-muted/30 rounded w-3/4 mx-auto sm:mx-0 mb-2" />
        <div className="h-3 bg-muted/20 rounded w-full mb-1" />
        <div className="h-3 bg-muted/20 rounded w-2/3 mx-auto sm:mx-0" />
      </div>
      <div className="h-8 w-20 bg-muted/30 rounded shrink-0" />
    </div>
    <div className="absolute top-1 right-2">
      <span className="text-[8px] uppercase tracking-wider text-muted-foreground/30">
        Sponsored
      </span>
    </div>
  </div>
);

// Full width banner - edge to edge
const FullWidthAd = ({ className, label }: { className?: string; label: string }) => (
  <div 
    className={cn(
      "relative bg-gradient-to-r from-muted/10 via-muted/20 to-muted/10 border-y border-border/30",
      formatStyles["full-width"],
      className
    )}
    data-ad-slot="ad-full-width"
    data-ad-format="full-width"
  >
    <div className="container mx-auto h-full flex items-center justify-center">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
        {label}
      </span>
    </div>
  </div>
);

// Mobile-optimized banner
const MobileBannerAd = ({ className }: { className?: string }) => (
  <div 
    className={cn(
      "relative flex items-center justify-center rounded-lg border border-dashed border-border/40 bg-muted/15",
      formatStyles["mobile-banner"],
      className
    )}
    data-ad-slot="ad-mobile-banner"
    data-ad-format="mobile-banner"
  >
    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
      Mobile Ad
    </span>
  </div>
);

// Sticky footer ad for mobile
const StickyFooterAd = ({ className }: { className?: string }) => (
  <div 
    className={cn(
      "bg-background/95 backdrop-blur-sm border-t border-border/50 flex items-center justify-center",
      formatStyles["sticky-footer"],
      className
    )}
    data-ad-slot="ad-sticky-footer"
    data-ad-format="sticky-footer"
  >
    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
      Mobile Sticky Ad
    </span>
  </div>
);

// Native ad format - blends with content
const NativeAd = ({ className }: { className?: string }) => (
  <div 
    className={cn(
      "relative rounded-lg bg-muted/10 p-4 border border-transparent hover:border-border/30 transition-colors",
      formatStyles.native,
      className
    )}
    data-ad-slot="ad-native"
    data-ad-format="native"
  >
    <div className="flex gap-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted/30 rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-4 bg-muted/30 rounded w-3/4 mb-2" />
        <div className="h-3 bg-muted/20 rounded w-full mb-1" />
        <div className="h-3 bg-muted/20 rounded w-1/2" />
      </div>
    </div>
    <div className="absolute top-1 right-2">
      <span className="text-[8px] uppercase tracking-wider text-muted-foreground/30">
        Sponsored
      </span>
    </div>
  </div>
);

export const AdPlaceholder = ({ 
  format = "inline", 
  className,
  label = "Advertisement",
  category,
  readTime,
  // Support legacy 'size' prop for backwards compatibility
  ...props
}: AdPlaceholderProps & { size?: AdFormat }) => {
  // Handle legacy 'size' prop
  const actualFormat = (props as any).size || format;

  switch (actualFormat) {
    case "blog-card":
      return <BlogCardAd className={className} category={category} readTime={readTime} />;
    case "related-article":
      return <RelatedArticleAd className={className} />;
    case "content-inline":
      return <ContentInlineAd className={className} />;
    case "full-width":
      return <FullWidthAd className={className} label={label} />;
    case "mobile-banner":
      return <MobileBannerAd className={className} />;
    case "sticky-footer":
      return <StickyFooterAd className={className} />;
    case "native":
      return <NativeAd className={className} />;
    default:
      return <BasicPlaceholder format={actualFormat} label={label} className={className} />;
  }
};
