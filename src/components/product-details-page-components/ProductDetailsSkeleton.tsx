// components/product/ProductDetailsSkeleton.tsx
export function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#e4e7ec]">
      <div
        className="container mx-auto"
        style={{
          maxWidth: "1300px",
          padding: "clamp(40px, 6vw, 80px) clamp(16px, 4vw, 64px)",
        }}
      >
        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image skeleton */}
          <div className="space-y-3">
            <div className="aspect-square w-full rounded-2xl bg-gray-200 animate-pulse" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-xl bg-gray-200 animate-pulse"
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              ))}
            </div>
          </div>
          {/* Info skeleton */}
          <div className="space-y-5">
            <div className="h-3 w-24 bg-orange-100 rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-10 w-36 bg-orange-100 rounded-xl animate-pulse" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 bg-gray-200 rounded animate-pulse"
                  style={{
                    width: `${70 + i * 10}%`,
                    animationDelay: `${i * 60}ms`,
                  }}
                />
              ))}
            </div>
            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-12 w-full bg-orange-100 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
