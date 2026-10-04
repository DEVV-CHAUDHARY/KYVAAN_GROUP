import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BRAND } from "../data/brand";
import Logo from "./Logo";

export default function LoadingScreen({ done }: { done: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* official logo — replaceable image asset */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Logo imgClassName="h-24 md:h-28" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="mt-7 text-[0.58rem] font-semibold uppercase tracking-[0.35em] text-bone/55"
          >
            {BRAND.tagline}
          </motion.p>

          {/* progress hairline */}
          <div className="absolute bottom-16 h-px w-40 bg-line">
            <div className="h-full bg-bronze" style={{ width: `${Math.max(progress * 100, 8)}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
