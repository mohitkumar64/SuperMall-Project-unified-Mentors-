import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Navbar from "../components/Navbar";
import MerchantSidebar from "./MerchantSidebar";
import { fetchProductsByShop } from "../../fireStoreServices";
import {uploadToCloudinary} from '../../utils/uploadImage'
import { addDoc, collection, serverTimestamp , deleteDoc , doc} from "firebase/firestore";
import { db } from "../../firebase";


function ManageProducts() {
  const { user , shopId } = useAuth();
  
  

  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
//   const [shopId, setShopId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null
  });

  // later: fetch shopId from users/{uid}
  useEffect(() => {
    try {
         fetchProductsByShop(shopId).then(setProducts)    
    } catch (error) {
            console.log(error);
            
    }
   
   
  }, []);

  useEffect(() => {
  
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] })
    setPreview(URL.createObjectURL(e.target.files[0]))
  };

const handleDelete = async (productId) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    //  Delete from Firestore
    await deleteDoc(doc(db, "products", productId));

    //  Update local state
    setProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );

  } catch (err) {
    console.error(err);
    alert("Failed to delete product");
  }
};



 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.price || !form.image) {
    alert("All fields required");
    return;
  }

  try {
    //  Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(form.image);

    //  Prepare product data
    const productData = {
      name: form.name,
      price: Number(form.price),
      imageUrl,
      shopId,
      createdAt: serverTimestamp()
    };

    //  Save to Firestore
    const docRef = await addDoc(
      collection(db, "products"),
      productData
    );

   // update ui
    setProducts((prev) => [
      ...prev,
      { id: docRef.id, ...productData }
    ]);

   // reset form
    setForm({
      name: "",
      price: "",
      image: null
    });
    setPreview(null)

  } catch (err) {
    console.error(err);
    alert("Product creation failed");
  }
};

  return (
        <div className="flex flex-col h-screen ">
            <Navbar />
            <div className="flex flex-1 overflow-hidden ">
                    <MerchantSidebar />
          <div className=" flex-1 overflow-y-auto p-6">
              <h1 className="text-3xl font-semibold mb-6">Manage Products</h1>

       

            {/* Add Product */}
            <div className="bg-white  flex flex-wrap p-6 rounded shadow max-w-md">
              <div>
                <h2 className="text-xl Font font-medium mb-4">Add Product</h2>

                <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 md:w-80 ">
                <input
                    name="name"
                    value={form.name}
                    placeholder="Product name"
                    className="border p-2  rounded"
                    onChange={handleChange}
                />

                <input
                    name="price"
                    value={form.price}
                    type="number"
                    placeholder="Price"
                    className="border p-2 rounded"
                    onChange={handleChange}
                />

        <label className="inline-block  bg-green-700 w-40 hover:bg-green-900 text-white Font  px-4 py-2 rounded cursor-pointer">
            Upload Image 
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            </label>

                <button className="bg-green-700 text-white py-2 rounded">
                    Add Product
                </button>
                </form>
              </div>
              
              {
                preview && <div className=" w-full h-full mt-2 ">
                    <p className="Font text-lg">Preview </p>
                    <img src={preview} alt="preview" />
                </div>
              }
            </div>

            {/* Existing Products */}
            <div className="mt-10 ">
                <h2 className="text-xl Font font-medium mb-4">Your Products</h2>

                {products.length === 0 ? (
                <p className="text-gray-500">No products added yet.</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                    {products.map((p) => (
                    <div key={p.id} className="border flex flex-col  max-w-55 p-4 rounded">
                        <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="h-40  object-fit mb-2"
                        />
                        <p className=" text-lg font-semibold ">{p.name}</p>
                        <p className="text-lg text-start Font font-bold text-gray-600">Price: ₹{p.price}</p>
                        <div className=" flex justify-start w-full mt-5">
                            <button className=" text-sm  text-white font-semibold Font bg-red-500 hover:bg-red-600 rouned-xl px-2 py-2"  onClick={()=>{handleDelete(p.id)}}>Delete</button>
                        </div>
                        
                    </div>
                    ))}
                </div>
                )}
            </div>
                     </div>
            </div>
        </div>
  );
}

export default ManageProducts;
