import { motion } from "motion/react";
import { useEffect, useState } from "react";

const LoadingPage = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear" as const,
        repeat: Infinity
      }
    }
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: { 
      width: `${progress}%`,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: "var(--gradient-loading)",
      }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-glow/20 rounded-full animate-float" />
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent-glow/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-glow/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="text-center z-10">
        {/* Main Spinner */}
        <div className="relative mb-8">
          <motion.div
            className="w-16 h-16 mx-auto relative"
            variants={spinnerVariants}
            animate="animate"
          >
            <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full" />
          </motion.div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 w-16 h-16 mx-auto bg-white/10 rounded-full blur-xl animate-pulse-glow" />
        </div>

        {/* Loading Text */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Loading
          </h1>
          <p className="text-white/80 text-lg">
            Preparing your experience...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-white to-white/80 rounded-full"
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </div>
          
          {/* Progress percentage */}
          <motion.div
            className="text-center mt-3 text-white/60 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;