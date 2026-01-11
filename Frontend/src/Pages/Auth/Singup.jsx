import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️ Firebase Auth
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      
      
      const uid = res.user.uid;

      // Firestore user metadata
      await setDoc(doc(db, "users", uid), {
        name: form.name,
        role: form.role,
        email : form.email ,
        createdAt: Date.now()
      });

        naviagte('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen rounded-2xl flex flex-col items-center ">
       <div className="md:w-70 w-50 p-5 flex flex-col items-center justify-center ">
          <img src="/mall-logo-2.svg" alt="logo " className="w-full"  />
          <p className="text-2xl md:text-4xl  Font text-gray-500 font-bold">Super Mall </p>
        </div>
      <form onSubmit={handleSignup} className="bg-white rounded-2xl  Font p-6  shadow w-96">
        <h2 className="text-2xl w-full  text-center font-semibold mb-4">Sign Up</h2>

        <input
          name="name"
          placeholder="Name"
          className="border rounded-md p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border rounded-md p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          autoComplete="correct-password"
          placeholder="Password"
          className="border rounded-md p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="border rounded-md p-2 w-full mb-3"
          onChange={handleChange}
        >
          <option className="rounded-md" value="merchant">user</option>
         
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
