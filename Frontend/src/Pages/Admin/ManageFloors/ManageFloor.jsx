import Navbar from "../../../Pages/components/Navbar";
import AdminSidebar from "../AdminSidebar";
import { useEffect, useState } from "react";
import {
  fetchShops,
  
  fetchFloors,
 createFloor
} from "../../../fireStoreServices";
import AddFloor from "./AddFloor";
import FloorCard from "./FloorCards";
import { useOutletContext } from "react-router-dom";

function ManageFloors() {
 const {shops } = useOutletContext();
  const [floors, setFloors] = useState([]);
 
 
  const [showAddFloor, setshowAddFloor] = useState(false);

  useEffect(() => {
    
    fetchFloors().then(setFloors);
    
  }, []);

  const handleCreateFloor = async (data) => {
    const newShop = await createFloor(data);
    setFloors((prev) => [...prev, newShop]);
    setshowAddFloor(false);
   
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">Floors</h1>
            <button
              onClick={() => setshowAddFloor(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              + Add Floor
            </button>
          </div>

          {/* floor grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {floors.map((floor) => (
              <FloorCard
                key={floor.id}
                shops={shops}
                floor={floor}
              
              />
            ))}
          </div>
        </div>
      </div>

      {showAddFloor && (
        <AddFloor
          floors={floors}
        
          onClose={() => setshowAddFloor(false)}
          onCreate={handleCreateFloor}
        />
      )}
    </div>
  );
}





export default ManageFloors;