import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add 'revealed' class to trigger CSS transition
          entry.target.classList.add('revealed');
          // Unobserve immediately (trigger once only)
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
};

export default useScrollReveal;

