import { motion } from "motion/react";

function SideBar({
  onFloorChange,
  onShopChange,
  selectedFloorId,
  selectedShopId,
  floors,
  shops,
  isOpen,
  onClose
}) {
  const visibleShops = selectedFloorId
    ? shops?.filter(s => s.floorId === selectedFloorId)
    : shops;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}

      <motion.div
        className={`fixed md:sticky top-16 z-50 md:z-auto bg-green-900 w-64 h-[calc(100vh-4rem)] p-4 pt-6 flex flex-col gap-4
        overflow-y-auto
        transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
        initial={false}
        animate={{}}
      >
        <div className="Font border-b-2 pb-3 border-green-950 text-2xl text-white font-semibold flex gap-4 items-center">
          <img src="sliders.svg" className="icon" alt="filter-btn" /> Filter
        </div>

          <button
            onClick={() => {
              onFloorChange(null);
              onShopChange(null);
              onClose?.();
            }}
            className="bg-yellow-300 text-black Font
                      px-3 py-2 rounded-xl
                      hover:bg-yellow-500 transition"
          >
            Clear Filter
    </button>
  
        <button
          className="md:hidden bg-yellow-300 text-black Font
                      px-3 py-2 rounded-xl
                      hover:bg-yellow-500 transition"
          onClick={onClose}
        >
          Close
        </button>

        <div >
          <div className="Font border-b-2 pb-3 border-green-950  text-xl text-white font-semibold flex gap-3 items-center">
            <img src="stairs.png" className="icon" alt="" /> Floor
          </div>

          <div className="mt-3 space-y-2">
            {floors.map(f => (
              <label key={f.id} className="flex gap-3 Font text-lg text-white">
                <input
                  type="radio"
                  checked={selectedFloorId === f.id}
                  onChange={() => {
                    onFloorChange(f.id);
                    onShopChange(null);
                  }}
                />
                {f.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="Font text-xl border-b-2 pb-3 border-green-950 text-white font-semibold flex gap-3 items-center">
            <img src="shopping-cart.png" className="icon" alt="shop" /> Shop
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {visibleShops.map(shop => (
              <p
                key={shop.id}
                onClick={() => onShopChange(shop.id)}
                className={`cursor-pointer p-2 text-lg font font-semibold rounded text-center
                  ${
                    selectedShopId === shop.id
                      ? "bg-yellow-500 text-black"
                      : "bg-[rgb(167,123,69)] text-black"
                  }`}
              >
                {shop.name}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SideBar;
