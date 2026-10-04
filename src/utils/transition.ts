export type TransitionState = {
  /** Section id to land on after the wipe. */
  scrollTo?: string;
  /** Project slug to highlight on the tree when returning. */
  highlight?: string;
  /** Project slug to pre-select in the enquiry form. */
  project?: string;
};

/**
 * Cinematic route transitions — dispatched as a window event so any
 * component can trigger the same wipe used by the tree experience.
 */
export const transitionTo = (to: string, image?: string, state?: TransitionState) => {
  window.dispatchEvent(
    new CustomEvent("kyvaan:transition", { detail: { to, image, state } })
  );
};
