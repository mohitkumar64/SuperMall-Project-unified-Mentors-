import { motion } from "motion/react";
import {NavLink} from 'react-router-dom'

const MotionNavLink = motion.create(NavLink);
function AdminSidebar() {
  const parent = {
    initial: { width: 70 },
   hover: {
    width: 240,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
}}

  const text = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="sticky md:top-16  bg-green-900 pt-8  flex flex-col gap-6 overflow-hidden"
      variants={parent}
      initial="initial"
      whileHover="hover"
    >
        {/* Dashboard */}
        <MotionNavLink to='/admin/Dashboard'
            className={({ isActive }) =>
          `flex items-center gap-4 px-3 py-2  transition-colors ${
            isActive ? "border-l-3 text-white border-red-500" : "text-white"
          }`
        }
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
        >
          <img src="/Dashboard.svg" alt="dashboard" className="w-8 h-8" />

        <motion.p
          
              variants={text}
              className={
      `text-xl font-semibold whitespace-nowrap transition-colors `}
            >
              Dashboard
            </motion.p>
          
        </MotionNavLink>
           {/* ManageFloors */}         
        <MotionNavLink to='/admin/manageFloors'
            className={({ isActive }) =>
          `flex items-center gap-4 px-3 py-2  transition-colors ${
            isActive ? "border-l-3 text-white border-red-500" : "text-white"
          }`
        }
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}>
          <img src="/stairs2.png" alt="dashboard" className="w-8 h-8" />

          
            <motion.p
              
              variants={text}
              className="text-xl font-semibold text-white whitespace-nowrap"
            >
              Manage Floor
            </motion.p>
        
        
          
          
        </MotionNavLink>
            {/* ManageShops */}
        <MotionNavLink to='/admin/manageShops'
            className={({ isActive }) =>
          `flex items-center gap-4 px-3 py-2  transition-colors ${
            isActive ? "border-l-3 text-white border-red-500" : "text-white"
          }`
        }
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}>
          <img src="/shopping.png" alt="dashboard" className="w-8 h-8" />

        <motion.p
            
              variants={text}
              className="text-xl font-semibold text-white whitespace-nowrap"
            >
              Manage Shops
            </motion.p>
          
          
        </MotionNavLink>
            {/* ManageMercants */}
          <MotionNavLink to='/admin/manageMerchants'
            className={({ isActive }) =>
          `flex items-center gap-4 px-3 py-2  transition-colors ${
            isActive ? "border-l-3 text-white border-red-500" : "text-white"
          }`
        }
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}>
          <img src="/images/entrepreneur.png" alt="dashboard" className="w-8 h-8" />

        <motion.p
            
              variants={text}
              className="text-xl font-semibold text-white whitespace-nowrap"
            >
              Manage Merchants
            </motion.p>
          
          
        </MotionNavLink>
        
    </motion.div>
  );
}

export default AdminSidebar;
