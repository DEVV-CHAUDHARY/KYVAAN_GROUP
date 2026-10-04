import { useState } from "react";
import { LOGO } from "../data/brand";

type Props = {
  /** Rendered height in px. Ignored when `imgClassName` sets a height. */
  size?: number;
  /**
   * Legacy prop, kept for API compatibility. The logo is always rendered as
   * the image asset alone — no typeset wordmark is ever drawn beside it.
   */
  wordmark?: boolean;
  className?: string;
  /** Responsive sizing, e.g. "h-9 md:h-11". */
  imgClassName?: string;
};

/**
 * The official KYVAAN logo — a plain, replaceable image asset.
 *
 *   public/assets/kyvaan-logo.png   →   served at /assets/kyvaan-logo.png
 *
 * Overwrite that file (same filename) and every placement updates with no
 * code change. Any aspect ratio works: height is fixed, width is auto, and a
 * max-width guard keeps very wide lockups in proportion. `object-fit: contain`
 * means the mark is never cropped, stretched or filtered.
 *
 * If the local file has not been added yet, the component falls back to the
 * official logo published on kyvaangroup.com. Nothing here redraws the mark.
 */
export default function Logo({ size = 40, className = "", imgClassName }: Props) {
  const sources = [LOGO.src, LOGO.fallbackSrc].filter(Boolean) as string[];
  const [i, setI] = useState(0);
  const exhausted = i >= sources.length;

  return (
    <span className={`inline-flex items-center ${className}`}>
      {!exhausted ? (
        <img
          src={sources[i]}
          alt={LOGO.alt}
          onError={() => setI((n) => n + 1)}
          decoding="async"
          className={`block w-auto shrink-0 object-contain ${imgClassName ?? ""}`}
          style={
            imgClassName
              ? { maxWidth: 220 }
              : { height: size, maxWidth: size * 5 }
          }
        />
      ) : (
        // Both image sources unavailable: expose the alt text only, at the same
        // footprint, exactly as a browser would for a missing image.
        <span
          className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-bone"
          style={imgClassName ? undefined : { lineHeight: `${size}px` }}
        >
          {LOGO.alt}
        </span>
      )}
    </span>
  );
}
