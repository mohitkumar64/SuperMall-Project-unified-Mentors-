import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  fetchProductsById,
  fetchShopById,
  fetchMerchantById
} from "../fireStoreServices";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
 
  

  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id){
      console.log("not id");
      
      return;
    } 

    const loadData = async () => {
      try {
        const productData = await fetchProductsById(id);
        setProduct(productData);

        const shopData = await fetchShopById(productData.shopId);
        setShop(shopData);

        const merchantData = await fetchMerchantById(shopData.merchantId);
        setMerchant(merchantData);
      } catch (err) {
        console.error("Failed to load product details", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen">
        <Navbar />
        <div className="p-6">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen">
        <Navbar />
        <div className="p-6">Product not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      {/* Back Button */}
      <div className="p-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-h-100 object-contain rounded-lg border"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-xl text-green-700 font-semibold">
            ₹ {product.price}
          </p>

          <div className="border-t pt-4">
            <p className="text-lg">
              <span className="font-semibold">Shop:</span>{" "}
              {shop?.name}
            </p>

            <p className="text-lg">
              <span className="font-semibold">Merchant:</span>{" "}
              {merchant?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
