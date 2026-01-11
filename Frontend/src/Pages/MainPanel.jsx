import SideBar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { fetchProducts, fetchShops } from "../fireStoreServices";
import FloorGrid from "./components/FloorGrid";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function MainPage() {
  const { floors } = useOutletContext();

  const [selectedFloorId, setSelectedFloorId] = useState(null);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchShops().then(setShops);
    fetchProducts().then(setProducts);
  }, []);

  const visibleFloors = selectedFloorId
    ? floors.filter(f => f.id === selectedFloorId)
    : floors;

  const visibleShops = shops.filter(shop => {
    if (selectedFloorId && shop.floorId !== selectedFloorId) return false;
    if (selectedShopId && shop.id !== selectedShopId) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      {/* Mobile filter button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50
                   bg-yellow-500 text-black Font
                   px-4 py-3 rounded-full shadow-lg"
      >
        Filter
      </button>

      <div className="flex-1 overflow-hidden flex">
        <SideBar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          floors={floors}
          shops={visibleShops}
          selectedFloorId={selectedFloorId}
          selectedShopId={selectedShopId}
          onFloorChange={(id) => {
            setSelectedFloorId(id);
            setSelectedShopId(null);
            setSidebarOpen(false);
          }}
          onShopChange={(id) => {
            setSelectedShopId(id);
            setSidebarOpen(false);
          }}
        />

        <div className="p-3 overflow-y-auto flex-1">
          {visibleFloors.map((floor) => (
            <FloorGrid
              key={floor.id}
              floor={floor}
              shops={visibleShops}
              products={products}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
