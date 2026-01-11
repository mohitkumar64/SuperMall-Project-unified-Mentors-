import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import {fetchShopByMerchantId  , updateShop,} from "../../fireStoreServices";
import { uploadToCloudinary } from "../../utils/uploadImage";

import Navbar from "../components/Navbar";
import MerchantSidebar from "./MerchantSidebar";

function MerchantDashboard() {
  const { user } = useAuth();

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    logoFile: null,
  });

 // load the shop or find it
  useEffect(() => {
    if (!user?.uid) return;

    const loadShop = async () => {
      setLoading(true);
      try {
        const shopDoc = await fetchShopByMerchantId(user.uid);

        if (!shopDoc || shopDoc.length === 0) {
          setShop(null);
          return;
        }

        const shopData = shopDoc[0]; 

        setShop(shopData);
        setForm({
          name: shopData.name || "",
          description: shopData.description || "",
          logoFile: null,
        });
      } catch (err) {
        console.error("Failed to load shop", err);
      } finally {
        setLoading(false);
      }
    };

    loadShop();
  }, [user]);

// handle changes and submit
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogo = (e) => {
    setForm((prev) => ({
      ...prev,
      logoFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shop) return;

    setSaving(true);

    try {
      let logoUrl = shop.logoUrl || null;

      if (form.logoFile) {
        logoUrl = await uploadToCloudinary(form.logoFile);
      }

      const updatedData = {
        name: form.name,
        description: form.description,
        logoUrl,
      };

      await updateShop(shop.id, updatedData);

      setShop((prev) => ({ ...prev, ...updatedData }));
      setForm((prev) => ({ ...prev, logoFile: null }));

      alert("Shop updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update shop");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return <div className="p-6">Loading shop...</div>;
  }

  if (!shop) {
    return (
      <div className="p-6 text-red-500 font-bold">
        No shop assigned. Contact admin.
      </div>
    );
  }


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <MerchantSidebar />

        <div className="flex-1 oveflow-y-auto p-2 md:p-6">
          <h1 className="text-3xl font-semibold mb-6">
            Shop Profile
          </h1>

          <div className="bg-white rounded-lg shadow p-6 max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {shop.logoUrl ? (
                  <img
                    src={shop.logoUrl}
                    alt="Shop Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                 <p className="text-gray-500 bg-gray-700 flex items-center justify-center text-6xl font-bold Font w-full h-full" > {shop.name[0]}</p>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {shop.name}
                </h2>
                <p className="text-gray-500">
                  Edit your shop details below
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Shop Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Shop Logo
                </label>

                <label className="inline-block bg-green-700 text-white px-4 py-2 rounded cursor-pointer">
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogo}
                  />
                </label>

                {form.logoFile && (
                  <p className="text-sm text-gray-600 mt-1">
                    {form.logoFile.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="self-start bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MerchantDashboard;
