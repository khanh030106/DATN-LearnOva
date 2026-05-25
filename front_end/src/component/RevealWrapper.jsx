import { useScrollReveal } from '../hook/useScrollReveal.js';

const RevealWrapper = ({ children, delay = 0 }) => {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="home-reveal"
      style={{ '--delay': `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealWrapper;
