// RowSkeleton.jsx
const RowSkeleton = ({ title = "Loading...", count = 6 }) => {
  return (
    <div className="px-6 mb-8">
      {/* Fake heading */}
      <div className="h-6 w-48 mb-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />

      {/* Placeholder cards */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-60 w-40 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default RowSkeleton;
