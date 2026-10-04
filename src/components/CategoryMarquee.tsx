const ITEMS = ["Residential", "Villas & Estates", "Commercial", "Mixed Use", "Hospitality", "Future Projects"];

export default function CategoryMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-bone/10 bg-ink-2 py-3.5" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-7 font-display text-sm font-light italic text-bone/55 md:text-base">
                  {item}
                </span>
                <span className="text-[0.6rem] text-bronze">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
