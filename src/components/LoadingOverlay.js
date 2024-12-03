// src/components/LoadingOverlay.js
export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl max-w-md mx-4">
        <div className="relative">
          {/* Loading Spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto mb-6"></div>

          {/* Loading Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
            <div className="bg-green-500 h-2 rounded-full animate-loading-bar"></div>
          </div>

          {/* Text Content */}
          <h2 className="text-2xl font-bold mb-4 text-white">
            Analyserer dine valg
          </h2>
          <div className="space-y-2 text-gray-300">
            <p>Vi finder de perfekte film til dig baseret på:</p>
            <ul className="text-sm">
              <li>• Genre præferencer</li>
              <li>• Ratings mønstre</li>
              <li>• Tematiske ligheder</li>
              <li>• Instruktør og skuespiller overlap</li>
            </ul>
          </div>

          {/* Processing Status */}
          <p className="text-green-400 mt-4 text-sm animate-pulse">
            Bearbejder data...
          </p>
        </div>
      </div>
    </div>
  );
}
