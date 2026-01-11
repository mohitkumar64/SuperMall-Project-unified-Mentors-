import { useState } from "react";

function AddMerchant({ users, onClose, onPromote }) {
  const [selectedUserId, setSelectedUserId] = useState("");

  const normalUsers = users.filter(u => u.role === "user");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUserId) {
      alert("Select a user");
      return;
    }

    onPromote(selectedUserId);
  };

  return (
    <div className="absolute inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Add Merchant</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            className="border p-2 rounded"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select User</option>
            {normalUsers.map(u => (
              <option key={u.id} value={u.id}>
                {u.name || u.email}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Promote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMerchant;
