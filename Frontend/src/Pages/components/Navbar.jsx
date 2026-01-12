import { useNavigate  } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
function Navbar() {
  const navigate = useNavigate();
  const {role} = useAuth();

const handleLogout = async()=>{
  try {
      await signOut(auth)
        navigate("/login", { replace: true });
  } catch (error) {
      console.log('Login failed '  ,error);
      alert("error while try to logOut")
      
  }
  
}

  return (
    <header className="bg-green-900 sticky border-b border-green-950 z-50 top-0 text-white w-full h-16 flex items-center ">

      
      {/* Logo */}
      <div className="flex items-center "
      
      onClick={()=>{
        navigate('/');
      }}>
        <img src="/mall-logo-2.svg" alt="Mall Logo" className="h-20 w-auto"
        />
        <span className="Font text-xl font-semibold">
          Super Mall
        </span>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-6 px-6">
        {
            // panel only for merchant or admin
          role !="user" && 
          
        <button className="Font text-lg hover:underline"  onClick={()=>{
          role === "admin" ?
          navigate('/admin/Dashboard') : navigate('/merchant/Dashboard')
        }}>
          Panel
        </button>
        }
        
        {
          role ?
           <button onClick={handleLogout} className="Font text-lg hover:underline">
         logout
        </button> :  <button onClick={()=> navigate('/login')} className="Font text-lg hover:underline">
         login/signup
        </button>
        }

        <button onClick={handleLogout} className="Font text-lg hover:underline">
         logout
        </button>
      </div>

    </header>
  );
}

export default Navbar;
