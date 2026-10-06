
/** Region view around Vrindavan / Jait — the verified KYVAAN project area. */
const GOOGLE_MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4719.047664145987!2d77.63277123431286!3d27.567273942965862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736d53f89d8c11%3A0xfc9b8d0d709b5d0e!2sKyvaan%20group!5e0!3m2!1sen!2sin!4v1791285707115!5m2!1sen!2sin";

export default function MapSection(_props: { onOpenProject: (slug: string) => void }) {
  return (
    <section id="location" className="relative border-t border-line bg-ink pb-14 md:pb-16">
      <div className="mx-auto max-w-[1500px] px-6 pt-14 md:px-10 md:pt-18">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-bronze">06 / Location</p>
            <h2 className="mt-3 font-display text-[2.3rem] font-normal leading-[1.02] text-bone md:text-[4rem]">
              Find <span className="italic text-bronze-2">KYVAAN.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs font-light leading-relaxed text-bone/55 md:text-right">
            KYVAAN's live projects are located in and around Vrindavan. Precise site locations are
            shared on enquiry.
          </p>
        </div>
      </div>

      <div className="relative mx-3 mt-8 h-[60vh] min-h-[420px] overflow-hidden rounded-[22px] border border-line shadow-[0_1px_2px_rgba(36,24,16,0.04),0_30px_60px_-40px_rgba(36,24,16,0.3)] md:mx-6 md:rounded-[28px] lg:mx-10">
        <iframe
          title="Map of the Vrindavan region where KYVAAN projects are located"
          src={GOOGLE_MAPS_EMBED_SRC}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
        />
      </div>
    </section>
  );
}
