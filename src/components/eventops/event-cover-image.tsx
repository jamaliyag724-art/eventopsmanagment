import { useState } from "react";
import { ImageOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type EventCoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function EventCoverImage({
  src,
  alt,
  className = "h-full w-full object-cover",
  loading = "lazy",
}: EventCoverImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === src;
  const failed = failedSrc === src;

  return (
    <div className="absolute inset-0 overflow-hidden bg-secondary" aria-busy={!loaded && !failed}>
      {!loaded && !failed && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}

      {failed ? (
        <div
          role="img"
          aria-label={`${alt} (image unavailable)`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-secondary text-muted-foreground"
        >
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <span className="text-[10px]">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={loading === "eager" ? "high" : "auto"}
          decoding="async"
          width={1280}
          height={720}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px"
          onLoad={() => setLoadedSrc(src)}
          onError={() => setFailedSrc(src)}
          className={`${className} transition-[opacity,transform] duration-500 ease-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {!loaded && !failed ? (
        <span className="sr-only">Loading event image</span>
      ) : null}
    </div>
  );
}
