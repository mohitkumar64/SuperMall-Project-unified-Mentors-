import { Outlet  } from "react-router-dom";
import { useEffect ,useState } from "react";
import { fetchFloors } from "../fireStoreServices";

function DataProvider() {
    const [floors , setFloors]  = useState([]);
    // const [shops , setShops] = useState([])

    useEffect(()=>{
        fetchFloors().then(setFloors)
    },[])
  return (
    <Outlet context={{floors , setFloors}} />
  );
}

export default DataProvider;