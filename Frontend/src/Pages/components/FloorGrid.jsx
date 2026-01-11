import ProductCard from "./ProductCard";

function FloorGrid({ floor, shops, products }) {
  const floorShops = shops.filter(s => s.floorId === floor.id);
  
  

  return (
    <section className="mb-12">
      
      {/* Floor Header */}
      <h2 className="text-3xl  Font font-bold text-gray-800 border-b pb-2 mb-6 flex gap-2 items-center">
        <p className="rounded-full bg-black w-2 h-2 "></p> {floor.name}
      </h2>

      {floorShops.length === 0 && (
        <p className="text-gray-500 italic ml-2">
          No shops available on this floor.
        </p>
      )}

      {floorShops.map((shop) => {
        const shopProducts = products.filter(
          product => product.shopId === shop.id
        );

        return (
          <div
            key={shop.id}
            className="ml-4 mb-10 p-4 bg-gray-50 rounded-lg border"
          >
            {/* Shop Header */}
            <h3 className="text-2xl flex items-center gap-2 font-semibold text-gray-700 mb-4">
              <img className="w-5 h-5 z-2" src="/icons8-shop-64.png" alt="shop-icon" />   {shop.name}
            </h3>

            {shopProducts.length === 0 ? (
              <p className="text-gray-500 italic">
                No products available in this shop.
              </p>
            ) : (
              <div className="grid grid-cols-2  lg:grid-cols-5 gap-6">
                {shopProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}

export default FloorGrid;
