export default function CategoryFilter({ categories, value, onChange }) {
  const allCategories = ['all', ...categories];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            value === cat
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
          }`}
        >
          {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}