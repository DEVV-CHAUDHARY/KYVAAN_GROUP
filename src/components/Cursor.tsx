import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CursorState = "explore" | "view" | "link" | null;

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>(null);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 450, damping: 40, mass: 0.4 });
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
    if (!fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
        setState((target?.dataset.cursor as CursorState) ?? null);
        // magnetic pull for magnetic elements
        const magnet = (e.target as HTMLElement)?.closest?.("[data-magnetic]") as HTMLElement | null;
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          if (el === magnet) {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px)`;
          } else {
            el.style.transform = "";
          }
        });
      });
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const label =
    state === "explore" ? "Explore" : state === "view" ? "View" : state === "link" ? "" : null;
  const active = label !== null;
  const size = active ? 76 : pressed ? 26 : 36;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] rounded-full border border-bone/40"
        style={{
          x: sx,
          y: sy,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: active ? "rgba(248,244,236,0.88)" : "transparent",
          borderColor: active ? "rgba(143,86,41,0.7)" : undefined,
          backdropFilter: active ? "blur(4px)" : undefined,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        {active && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center text-[0.55rem] font-bold uppercase tracking-[0.18em] text-bronze-2"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[121] h-1.5 w-1.5 rounded-full bg-bronze-2"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
