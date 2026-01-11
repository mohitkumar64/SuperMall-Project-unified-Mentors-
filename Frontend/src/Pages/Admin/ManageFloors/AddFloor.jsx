import { useState } from "react";

function AddFloor({ onClose, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    order: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.order) {
      alert("All fields required");
      return;
    }

    onCreate({
      name: form.name,
      order: Number(form.order)
    });
  };

  return (
    <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Add Floor</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Floor Name (e.g. Ground Floor)"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="order"
            type="number"
            placeholder="Order (e.g. 1)"
            className="border p-2 rounded"
            onChange={handleChange}
          />

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

export default AddFloor;
