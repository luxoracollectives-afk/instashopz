export default function ShopPage() {
  const products = [
    { id: 1, name: "T‑Shirt", price: "₹499" },
    { id: 2, name: "Shoes", price: "₹999" },
    { id: 3, name: "Watch", price: "₹1499" },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      <div className="grid grid-cols-2 gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl p-4 shadow-sm bg-gray-50 text-black"
          >
            <div className="h-24 bg-gray-300 rounded-md mb-3"></div>
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
