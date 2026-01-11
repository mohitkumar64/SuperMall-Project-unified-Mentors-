import { motion } from "motion/react";
import {NavLink} from 'react-router-dom'

const MotionNavLink = motion.create(NavLink);
function MerchantSidebar() {
  const parent = {
    initial: { width: 80 },
   hover: {
    width: 250,
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
      className="sticky top-16 h-screen bg-green-900 pt-8  flex flex-col gap-6 overflow-hidden"
      variants={parent}
      initial="initial"
      whileHover="hover"
    >
      <MotionNavLink
      to='/merchant/Dashboard'
          className={({ isActive }) =>
        `flex items-center gap-4 px-3 py-2  transition-colors ${
          isActive ? "border-l-4 text-white border-red-500" : "text-white"
        }`
      }
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
      >
        <img src="/Dashboard.svg" alt="dashboard" className="w-15" />

       <motion.p
         
             variants={text}
             className={
    `text-xl font-semibold whitespace-nowrap transition-colors `}
          >
             Dashboard
          </motion.p>
        
      </MotionNavLink>

      <MotionNavLink to='/merchant/manageProducts'
          className={({ isActive }) =>
        `flex items-center gap-4 px-3 py-2  transition-colors ${
          isActive ? "border-l-4 text-white border-red-500" : "text-white"
        }`
      }
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}>
        <img src="/images/manageProducts.png" alt="dashboard" className="w-15" />

        
          <motion.p
            
             variants={text}
            className="text-lg font-semibold text-white whitespace-nowrap"
          >
             Manage Products
          </motion.p>
       
      
        
        
      </MotionNavLink>

   
       
    </motion.div>
  );
}

export default MerchantSidebar;
