KYVAAN GROUP — LOGO ASSET
========================

The website loads the KYVAAN logo as a plain image from:

    public/assets/kyvaan-logo.png      (served at  /assets/kyvaan-logo.png)

TO REPLACE THE LOGO
-------------------
Overwrite that file with your logo, keeping the same filename.
No code change is needed — every placement updates automatically.

Any aspect ratio works. Each placement fixes the HEIGHT and lets the width
follow the image's natural proportions (object-fit: contain), so the logo is
never cropped, stretched or filtered. Very wide lockups are capped at 220px.

    Navigation   36px mobile  /  44px desktop
    Hero         64px mobile  /  96px desktop
    Loading      96px mobile  / 112px desktop
    Footer       44px
    Ecosystem    28px (subtle)

UNTIL THE FILE IS ADDED
-----------------------
If kyvaan-logo.png is missing, the site temporarily shows the official logo
image already published at:

    https://www.kyvaangroup.com/assets/logo.jpg

Once your file is in place it takes priority. To disable that fallback, set
`fallbackSrc: null` in src/data/brand.ts.

The logo is never redrawn, regenerated or typeset in code.

RECOMMENDATIONS
---------------
· PNG with a transparent background (or SVG — then update LOGO.src)
· A dark/espresso version reads best on the ivory theme
· At least 2x the largest display height (≥ 240px tall) for sharp retina rendering
