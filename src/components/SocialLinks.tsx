import { SOCIALS, type Social } from "../data/brand";

const ICONS: Record<Social["id"], React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 8.5h2.2V5.6h-2.4c-2.3 0-3.6 1.4-3.6 3.7v1.6H8.4v3h2.3V21h3.1v-7.1h2.3l.4-3h-2.7v-1.3c0-.8.3-1.1 1-1.1Z" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.4 9.6v4.8l4.2-2.4Z" fill="currentColor" stroke="none" />
    </>
  ),
};

type Props = { size?: "sm" | "md"; className?: string };

export default function SocialLinks({ size = "sm", className = "" }: Props) {
  const box = size === "md" ? "h-10 w-10" : "h-9 w-9";
  const ico = size === "md" ? 19 : 17;

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {SOCIALS.map((s) => {
        const icon = (
          <svg
            width={ico}
            height={ico}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {ICONS[s.id]}
          </svg>
        );

        return (
          <li key={s.id}>
            {s.url ? (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`KYVAAN Group on ${s.label} (opens in a new tab)`}
                title={s.label}
                className={`${box} flex items-center justify-center rounded-full border border-bone/15 text-bone/55 transition-all duration-400 hover:scale-105 hover:border-bronze/55 hover:text-bronze-2`}
                data-cursor="link"
              >
                {icon}
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={`${s.label} — coming soon`}
                className={`${box} flex cursor-default items-center justify-center rounded-full border border-bone/10 text-bone/25`}
              >
                {icon}
                <span className="sr-only">{s.label} — coming soon</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export const hasAnySocial = SOCIALS.some((s) => s.url);
