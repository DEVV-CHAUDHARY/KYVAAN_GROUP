import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  label: string;
  className?: string;
};

/** Cinematic video block — poster-first, lazy, with real controls. */
export default function VideoBlock({ src, poster, label, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // only attach the source once the block is near the viewport
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(
        () => setPlaying(true),
        () => setPlaying(false)
      );
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const fullscreen = () => ref.current?.requestFullscreen?.();

  return (
    <div
      ref={wrap}
      className={`group relative isolate overflow-hidden rounded-[18px] border border-line bg-ink-3 shadow-[0_24px_48px_-32px_rgba(36,24,16,0.3)] ${className}`}
    >
      {armed ? (
        <video
          ref={ref}
          className="h-full w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt={label} className="h-full w-full object-cover" loading="lazy" />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />

      {/* centre play affordance */}
      {!playing && (
        <button
          onClick={toggle}
          aria-label={`Play ${label}`}
          className="absolute inset-0 flex items-center justify-center"
          data-cursor="link"
        >
          <span className="glass flex h-16 w-16 items-center justify-center rounded-full text-bone transition-transform duration-500 group-hover:scale-110 md:h-20 md:w-20">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor" aria-hidden="true">
              <path d="M17 10 0 20V0z" />
            </svg>
          </span>
        </button>
      )}

      {/* controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
        <span className="caption-photo text-[0.56rem] font-semibold uppercase tracking-[0.28em]">{label}</span>
        <div className="flex gap-2">
          <button
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-bone/85 transition-colors hover:text-bronze-2"
            data-cursor="link"
          >
            {playing ? (
              <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden="true">
                <rect width="3.4" height="12" /><rect x="7" width="3.4" height="12" />
              </svg>
            ) : (
              <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" aria-hidden="true">
                <path d="M11 6 0 12V0z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-bone/85 transition-colors hover:text-bronze-2"
            data-cursor="link"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h2.5L9 3v10L5.5 10H3z" />
              {muted ? <path d="M11.5 6.5l3 3m0-3l-3 3" /> : <path d="M11.5 5.6a3.4 3.4 0 0 1 0 4.8" />}
            </svg>
          </button>
          <button
            onClick={fullscreen}
            aria-label="View video fullscreen"
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-bone/85 transition-colors hover:text-bronze-2"
            data-cursor="link"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 5V1h4M13 9v4H9M9 1h4v4M5 13H1V9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
