import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HiChevronUp } from "react-icons/hi";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 bg-custom-blue text-white p-3 rounded-full shadow-lg hover:bg-customed-blue transition"
      aria-label="Scroll to top"
    >
      <HiChevronUp size={24} />
    </button>
  );
}
