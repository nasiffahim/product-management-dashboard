export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-200 h-48 w-full" />

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
        
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-3" />

        {/* Rating Stars */}
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 w-3 bg-gray-200 rounded" />
          ))}
        </div>

        {/* Price and Buttons */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="flex gap-2">
            <div className="h-9 w-9 bg-gray-200 rounded" />
            <div className="h-9 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid of skeleton cards for loading state
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}