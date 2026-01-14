import Navbar from "../../../Pages/components/Navbar";
import AdminSidebar from "../AdminSidebar";
import { useEffect, useState } from "react";
import {
  fetchShops,
  fetchUsers,
  fetchFloors,
  createShopAndAssignMerchant
} from "../../../fireStoreServices";
import AddShop from "./AddShop";
import ShopCard from "./ShopCards";

function Shops() {
  const [shops, setShops] = useState([]);
  const [floors, setFloors] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddShop, setShowAddShop] = useState(false);

  const removeShop = (id) => {
  setShops((prev) => prev.filter(p => p.id !== id));
};

  useEffect(() => {
    fetchShops().then(setShops);
    fetchFloors().then(setFloors);
    fetchUsers().then(setUsers);
  }, []);

  const handleCreateShop = async (data) => {
    const newShop = await createShopAndAssignMerchant(data);
    setShops((prev) => [...prev, newShop]);
    setShowAddShop(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">Shops</h1>
            <button
              onClick={() => setShowAddShop(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              + Add Shop
            </button>
          </div>

          {/* Shop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {shops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                floors={floors}
                users={users}
                removeShop = {removeShop}
              />
            ))}
          </div>
        </div>
      </div>

      {showAddShop && (
        <AddShop
          floors={floors}
          users={users}
          onClose={() => setShowAddShop(false)}
          onCreate={handleCreateShop}
        />
      )}
    </div>
  );
}





export default Shops;