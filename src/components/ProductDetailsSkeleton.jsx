export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse" />

        {/* Main Product Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section Skeleton */}
            <div className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-96 mb-4" />
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-20" />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="animate-pulse">
              {/* Category & Brand */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-6 w-20 bg-gray-200 rounded-full" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>

              {/* Title */}
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-full mb-3" />

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="h-10 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-48" />
              </div>

              {/* Description */}
              <div className="mb-6">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>

              {/* Stock */}
              <div className="h-5 bg-gray-200 rounded w-40 mb-6" />

              {/* Quantity */}
              <div className="mb-6">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-200 rounded" />
                  <div className="h-6 w-12 bg-gray-200 rounded" />
                  <div className="h-10 w-10 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mb-6">
                <div className="h-12 flex-1 bg-gray-200 rounded-lg" />
                <div className="h-12 w-12 bg-gray-200 rounded-lg" />
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section Skeleton */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-6" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between py-2">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between py-2">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}