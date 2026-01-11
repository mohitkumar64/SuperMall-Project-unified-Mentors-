import { motion } from "motion/react";
import Lottie from "lottie-react";

export default function LottieAnimation({ animation,  loop = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
     whileInView={{ opacity: 1, scale: 0.9 }}
      transition={{ duration: 0.9 , delay : 0.4}}
      className="flex  justify-center  w-40 h-40 overflow-hidden items-center"
    >
      <Lottie 
        animationData={animation}
        loop={loop}
        
      />
      
    </motion.div>
  );
}
