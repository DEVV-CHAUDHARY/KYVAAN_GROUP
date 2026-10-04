import Logo from "./components/Logo";
import Cursor from "./components/Cursor";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import { getProject } from "./data/projects";
import { HashRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LegalPage from "./pages/LegalPage";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TransitionState } from "./utils/transition";

type Phase = "idle" | "cover" | "reveal";
type Pending = { to: string; state?: TransitionState };

const EASE_WIPE = [0.76, 0, 0.24, 1] as const;

export default function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}

function Shell() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [pending, setPending] = useState<Pending | null>(null);
  const [media, setMedia] = useState<string | null>(null);
  const phaseRef = useRef<Phase>("idle");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const land = useCallback((state?: TransitionState) => {
    if (state?.scrollTo) {
      window.setTimeout(
        () => document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: "smooth" }),
        140
      );
    } else if (state?.project) {
      window.setTimeout(
        () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
        140
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const run = useCallback(
    (to: string, image?: string, state?: TransitionState) => {
      if (phaseRef.current !== "idle") return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        navigate(to, state ? { state } : undefined);
        window.scrollTo(0, 0);
        land(state);
        return;
      }
      setMedia(image ?? null);
      setPending({ to, state });
      phaseRef.current = "cover";
      setPhase("cover");
    },
    [navigate, land]
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const { to, image, state } = (e as CustomEvent).detail as {
        to: string;
        image?: string;
        state?: TransitionState;
      };
      run(to, image, state);
    };
    window.addEventListener("kyvaan:transition", handler);
    return () => window.removeEventListener("kyvaan:transition", handler);
  }, [run]);

  /** Tree / showcase / map → the project's own route. */
  const openProject = (slug: string) => run(`/projects/${slug}`, getProject(slug)?.heroImage);

  /** Project page → home enquiry form, pre-filled. */
  const enquire = (slug: string) => run("/", undefined, { project: slug });

  return (
    <>
      <button
        onClick={() => document.getElementById("tree")?.scrollIntoView({ behavior: "smooth" })}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:bg-bronze focus:px-5 focus:py-3 focus:text-xs focus:font-bold focus:uppercase focus:tracking-[0.25em] focus:text-ink"
      >
        Skip to the KYVAAN ecosystem
      </button>

      <Cursor />
      <LoadingScreen done={!loading} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home onOpenProject={openProject} />} />
        <Route path="/projects/:slug" element={<ProjectPage onEnquire={enquire} />} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {phase !== "idle" && (
        <motion.div
          className="fixed inset-0 z-[80] overflow-hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: phase === "cover" ? "inset(0 0 0% 0)" : "inset(100% 0 0 0)" }}
          transition={{ duration: 0.8, ease: EASE_WIPE }}
          onAnimationComplete={() => {
            if (phase === "cover" && pending) {
              navigate(pending.to, pending.state ? { state: pending.state } : undefined);
              window.scrollTo(0, 0);
              land(pending.state);
              phaseRef.current = "reveal";
              setPhase("reveal");
            } else if (phase === "reveal") {
              phaseRef.current = "idle";
              setPhase("idle");
              setPending(null);
            }
          }}
        >
          {media ? (
            <img src={media} alt="" aria-hidden="true" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-ink">
              <Logo imgClassName="h-20" />
            </div>
          )}
          {media && <div className="absolute inset-0 bg-espresso/15" />}
          <div className="absolute inset-x-0 bottom-0 h-px bg-bronze" />
        </motion.div>
      )}
    </>
  );
}
