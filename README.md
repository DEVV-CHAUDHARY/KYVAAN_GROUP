# KYVAAN Group Website

A React + TypeScript real-estate showcase built with Vite, Tailwind CSS 4, React Router and Framer Motion.

## Requirements
- Node.js 20.19+ or 22.12+ (compatible with Vite 7)
- npm

## Local development
```bash
npm install
npm run dev
``

## Production build
```bash
npm run build
npm run preview
``

The production output is generated in `dist/`. Review generated assets and API routes before choosing a deployment target.

## AI assistant configuration
The optional serverless endpoint is `api/chat.ts`. Configure these environment variables in the deployment environment:
- `GEMINI_API_KEY` — required for Gemini-powered replies. Without it, the endpoint returns a basic local fallback response.
- `GEMINI_MODEL` — optional model override; defaults to `gemini-2.5-flash`.

Keep API keys in deployment environment settings. Never add secrets to frontend code or commit them to Git. The chat endpoint requires a serverless-compatible deployment (for example, Vercel); a static-only host will not execute it.

## Enquiries
The contact form prepares an enquiry in WhatsApp using the configured KYVAAN WhatsApp number. The visitor must review and press Send in WhatsApp. This does not automatically store a lead or guarantee delivery. For managed lead capture, connect a server-side form endpoint and email/CRM provider with credentials stored as environment variables.

## Content and projects
- Brand/contact details: `src/data/brand.ts`
- Project content: `src/data/projects.ts`
- Shared UI: `src/components/`
- Pages: `src/pages/`

Confirm project details, contact channels, images and legal disclosures before production launch.

## Deployment checklist
1. Import the repository into Vercel or another compatible platform.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Configure `GEMINI_API_KEY` only if the AI endpoint is enabled.
4. Verify the serverless `/api/chat` route is deployed and reachable; static hosting alone is insufficient.
5. Test the contact-to-WhatsApp flow on desktop and mobile.
6. Check direct navigation to project, privacy and terms routes.
7. Run `npm run build` and resolve build/type errors before release.
