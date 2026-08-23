import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down" | "both";

type UseScrollDirectionOptions = {
  direction?: ScrollDirection;
  threshold?: number;
};

type UseScrollDirectionResult = {
  direction: "up" | "down" | null;
  scrollY: number;
};

export function useScrollDirection({
  direction: detectedDirections = "both",
  threshold = 8,
}: UseScrollDirectionOptions = {}): UseScrollDirectionResult {
  const [scrollY, setScrollY] = useState(() =>
    typeof window === "undefined" ? 0 : window.scrollY,
  );
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const distance = Math.abs(currentScrollY - lastScrollY);

      if (currentScrollY === 0) {
        lastScrollY = 0;
        setScrollY(0);
        if (detectedDirections === "both" || detectedDirections === "up") {
          setScrollDirection("up");
        }
        return;
      }

      if (distance < threshold) {
        return;
      }

      const nextDirection = currentScrollY > lastScrollY ? "down" : "up";

      setScrollY(currentScrollY);
      if (detectedDirections === "both" || detectedDirections === nextDirection) {
        setScrollDirection(nextDirection);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [detectedDirections, threshold]);

  return { direction: scrollDirection, scrollY };
}
