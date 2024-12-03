// src/components/SelectionHeader.js
export default function SelectionHeader({ selectedCount }) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Vælg dine favorit film</h1>
      <div className="fixed top-4 right-4 bg-gray-800 px-4 py-2 rounded-lg">
        <p className="text-lg font-semibold">Valgte film: {selectedCount}/5</p>
      </div>
    </div>
  );
}
