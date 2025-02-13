import { motion } from "framer-motion";
import { ReactNode } from "react";

const AnimatedPage = ({ children, disableAnimation = false }: { children: ReactNode; disableAnimation?: boolean }) => {
  if (disableAnimation) {
    return <>{children}</>; // Renderizar sin animación
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Un poco más de desplazamiento para suavizar
      animate={{ opacity: 1, y: 0 }}
      //exit={{ opacity: 0, y: 30 }} // También suave al salir
      transition={{
        duration: 0.7, // Aumentamos la duración para más suavidad
        ease: [0.25, 0.1, 0.25, 1], // `ease` estilo "ease-in-out" (cubic-bezier)
      }}
    >
      {children}
      
    </motion.div>
  );
};

export default AnimatedPage;



