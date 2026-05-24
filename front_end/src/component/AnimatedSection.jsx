import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    /* START HOME SMOOTH ANIMATION REFACTOR */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Unobserve after first trigger (triggerOnce behavior)
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
