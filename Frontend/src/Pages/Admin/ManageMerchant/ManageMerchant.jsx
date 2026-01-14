import Navbar from "../../../Pages/components/Navbar";
import AdminSidebar from "../AdminSidebar";
import { useEffect, useState } from "react";
import { fetchUsers, promoteToMerchant } from "../../../fireStoreServices";
import AddMerchant from "./AddMerchant";
import MerchantCard from "./MerchantCards";
import { useOutletContext } from "react-router-dom";

function ManageMerchants() {
  const [users, setUsers] = useState([]);
  const [showAddMerchant, setShowAddMerchant] = useState(false);
  const {shops} = useOutletContext();

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const merchants = users.filter(u => u.role === "merchant");
  const removeMerchant = (merchantId)=>{
    users.filter(m => m.id !== merchantId)
  }
  const handlePromote = async (userId) => {
    await promoteToMerchant(userId);

    setUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, role: "merchant" } : u
      )
    );

    setShowAddMerchant(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between mb-6">
            <h1 className=" text-xl    md:text-3xl font-bold">Merchants</h1>
            <button
              onClick={() => setShowAddMerchant(true)}
              className="bg-blue-600 text-white px-2 md:px-5 md:py-2 rounded"
            >
              + Add Merchant
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {merchants.map(m => {
                const shop = shops.filter((s)=> s.merchantId === m.id)
             return ( <MerchantCard key={m.id} 
              removeMerchant={removeMerchant}     shop={shop} merchant={m} />)}
            )}
          </div>
        </div>
      </div>

      {showAddMerchant && (
        <AddMerchant
          users={users}
          onClose={() => setShowAddMerchant(false)}
          onPromote={handlePromote}
        />
      )}
    </div>
  );
}

export default ManageMerchants;
