// src/components/Header.js
export default function Header({ selectedCount }) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Vælg dine favorit film
      </h1>

      <div className="mb-4 text-center">
        <p className="text-gray-300">
          Vælg mellem 5-10 film for at få personlige anbefalinger
        </p>
        <p className="text-gray-300">Valgte film: {selectedCount}/10</p>
      </div>
    </>
  );
}
