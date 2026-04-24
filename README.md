# NutriScan AI

NutriScan AI is a Next.js 16 App Router application for AI-assisted meal analysis with authentication, MongoDB persistence, meal history, and personalized health insights.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Required Environment Variables

These are defined in `.env.example`:

- `MONGO_URI`: MongoDB connection string
- `NEXTAUTH_SECRET`: random secret used by NextAuth
- `NEXTAUTH_URL`: public app URL, for example `http://localhost:3000` locally or your production domain
- `AI_PROVIDER`: `mock`, `claude`, `openai`, or `gemini`
- `ANTHROPIC_API_KEY`: required if `AI_PROVIDER=claude`
- `ANTHROPIC_MODEL`: optional Claude model override
- `GOOGLE_ID` / `GOOGLE_SECRET`: required if using Google login
- `GITHUB_ID` / `GITHUB_SECRET`: required if using GitHub login

## Deployment

This app must be deployed as a Node.js server target because it uses:

- NextAuth session handling
- MongoDB-backed API routes
- dynamic server rendering

It should not be deployed as a static export.

### Recommended: Vercel

1. Push the repo to GitHub.
2. Import the project into Vercel.
3. Add all environment variables from `.env.example` in the Vercel project settings.
4. Set `NEXTAUTH_URL` to your production domain, for example `https://your-domain.com`.
5. Deploy.

Vercel will run the existing scripts:

```bash
npm run build
npm run start
```

If you want to deploy from the CLI instead of the Vercel dashboard:

```bash
npm i -g vercel
vercel
vercel --prod
```

### Self-Hosting / Node Server

This project is configured with `output: "standalone"` in `next.config.ts`, which makes Node or Docker deployment easier.

Build and run:

```bash
npm run build
npm run start:standalone
```

### Docker

Build the image:

```bash
docker build -t nutriscan-ai .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env.local nutriscan-ai
```

For production, pass your real environment variables from your hosting platform instead of mounting `.env.local`.

### Production Checklist

- Use a production MongoDB database
- Set a strong `NEXTAUTH_SECRET`
- Set the correct `NEXTAUTH_URL`
- Add OAuth provider keys if you want Google or GitHub sign-in
- If you do not configure OAuth, keep using credentials login only
- If you use `AI_PROVIDER=claude`, make sure the Anthropic key has billing or credits available

## Notes

- The app supports `mock` AI mode, which is useful for testing deployments before adding a live AI provider.
- If `npm run build` fails locally with a `.next` lock error, stop any running dev server first and retry.
