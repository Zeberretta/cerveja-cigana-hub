import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ViewportRevealProps {
  className?: string;
}

const ViewportReveal = ({ children, className }: PropsWithChildren<ViewportRevealProps>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn(!visible ? "opacity-0 translate-y-2" : "animate-fade-in", className)}>
      {children}
    </div>
  );
};

export default ViewportReveal;
