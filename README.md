# Corporate Translator

Corporate Translator turns ordinary workplace accomplishments into humorous,
over-optimized LinkedIn-style posts. It is a small Next.js App Router project
with a client-side interface, a server-side Groq translation route, shareable
post URLs, theme persistence, and basic abuse protection.

## Features

- Four translation intensities: Professional, LinkedIn, Corporate Overload,
  and Absolutely Unhinged.
- Server-side Groq integration so the API key is never exposed to the browser.
- Regenerate, copy, and share actions for generated posts.
- Share URLs that restore the input, selected intensity, and generated result.
- Explicit light/dark mode with a persisted browser preference.
- Generated favicon, Open Graph image, Twitter metadata, and descriptive page
  metadata.
- Privacy policy at [corporate-translator-amber.vercel.app/privacy](https://corporate-translator-amber.vercel.app/privacy).
- Per-client rate limiting and request validation on the translation endpoint.
- Security response headers configured for deployment.

## Technology

- Next.js `16.3.6` with the App Router and Turbopack
- React `19.2.8`
- TypeScript
- Tailwind CSS `4`
- `lucide-react` for interface icons
- `groq-sdk` for model requests
- Vercel-compatible deployment model

## Project structure

```text
src/app/
  api/translate/route.ts    Server-side Groq route and request protection
  icon.svg                  Branded app icon
  opengraph-image.tsx       Generated social preview image
  privacy/page.tsx          Public privacy policy
  globals.css               Tailwind setup and theme variables
  layout.tsx                Root metadata, fonts, and document shell
  page.tsx                  Translator interface and browser interactions
public/
  favicon.svg               Public fallback favicon
```

## Requirements

- Node.js 20 or newer
- npm
- A Groq API key

## Local setup

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

Keep `.env.local` private. It is read only by the server-side route and must
never be prefixed with `NEXT_PUBLIC_`.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The privacy page is
available at [http://localhost:3000/privacy](http://localhost:3000/privacy).

## Available scripts

```bash
npm run dev        # Start the development server
npm run lint       # Run ESLint
npx tsc --noEmit   # Type-check without emitting files
npm run build      # Create a production build
npm run start      # Serve the production build
```

## Request flow

1. The browser sends `input` and `intensity` to `POST /api/translate`.
2. The route checks the request origin, payload size, input length, and
   intensity type.
3. A short-window per-client limiter protects the Groq quota.
4. The server calls Groq with the private `GROQ_API_KEY`.
5. The route removes any generated `Takeaway` section and returns the result.
6. The browser renders the result without persisting it on the server.

The accepted input limit is 2,000 characters. The current limiter allows five
requests per client per 60 seconds and returns `429` with `Retry-After` when a
client exceeds that limit.

## Sharing behavior

Normal translation keeps the address bar clean. Clicking Share creates a URL
containing the source input, intensity, and generated result. Those values are
URL-encoded and restored when the link is opened. Anyone with a shared URL can
read the post, so sensitive content should not be shared.

## Privacy and security

Read the in-app [privacy policy](/privacy) for the user-facing explanation.
Important implementation details:

- The Groq key stays in the server environment.
- The API rejects browser requests from a different origin.
- Request payloads over 12,000 bytes are rejected.
- Input is limited to 2,000 characters and intensity must be a string.
- API responses are marked `Cache-Control: no-store`.
- The app sends `X-Content-Type-Options`, `X-Frame-Options`, HSTS,
  `Permissions-Policy`, and `Referrer-Policy` headers.
- No authentication, database, analytics, or advertising cookies are used.

The limiter is intentionally in-memory and works best for a single server
instance. A horizontally scaled production deployment should replace it with
a shared store such as Vercel KV, Upstash Redis, or another external rate
limiting provider.

## Deploying to Vercel

1. Push the repository to a Git provider.
2. Import the repository into Vercel.
3. Add `GROQ_API_KEY` under the project Environment Variables for the relevant
   environments.
4. Deploy and verify the homepage, `/privacy`, `/opengraph-image`, and the
   translation route.
5. For production traffic, move rate-limit state to a shared store.

The app uses `metadataBase` in `src/app/layout.tsx` for social metadata and is
configured for `https://corporate-translator-amber.vercel.app`.

## Responsible use

The translator is intended for playful writing assistance. Review generated
posts before publishing them, do not submit confidential information, and do
not present exaggerated framing as evidence of accomplishments that did not
happen.
