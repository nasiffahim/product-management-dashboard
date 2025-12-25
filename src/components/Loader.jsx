export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />
        
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-orange-500 opacity-75" />
        </div>
      </div>
      
      <p className="mt-4 text-sm text-gray-600 animate-pulse">Loading products...</p>
    </div>
  );
}