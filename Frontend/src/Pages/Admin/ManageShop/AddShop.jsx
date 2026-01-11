import { useState } from "react";

function AddShop({ floors, users, onClose, onCreate }) {
  const merchants = users.filter((u) => u.role === "merchant");

  const [form, setForm] = useState({
    name: "",
    description: "",
    floorId: "",
    merchantId: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.floorId || !form.merchantId) {
      alert("All fields required");
      return;
    }

    onCreate(form);
  };

  return (
    <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-105">
        <h2 className="text-2xl font-bold mb-4">Add Shop</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Shop Name"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 rounded"
            rows={3}
            onChange={handleChange}
          />

          <select
            name="floorId"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select Floor</option>
            {floors.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            name="merchantId"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select Merchant</option>
            {merchants.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name || m.email}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddShop;
