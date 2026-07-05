import { motion } from "framer-motion";

export default function PageShell({ children, className = "" }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`mx-auto min-h-[70vh] w-full max-w-6xl px-6 py-12 ${className}`}
    >
      {children}
    </motion.main>
  );
}
