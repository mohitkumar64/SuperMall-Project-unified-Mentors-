import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState ,  useEffect} from "react";
import { fetchProducts , fetchShops , fetchUsers , fetchFloors } from "../fireStoreServices";

function AdminRoute() {
  const[users , setUsers] = useState([]);
  const [shops , setShops] = useState([])
  const [Products , setProducts] = useState([]);
    const [floors , setFloors] = useState([]);
   const { role, loading } = useAuth();

useEffect(()=>{
  if(role == "admin"){
  fetchShops().then(setShops)
  fetchProducts().then(setProducts)
  fetchUsers().then(setUsers)
  fetchFloors().then(setFloors)
}
},[role])
 

  if (loading) return null;
  return role === "admin" ? <Outlet context={{users , shops , floors , Products}} /> : <Navigate to="/login" />;
}

export default AdminRoute;
