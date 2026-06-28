# AI Resume Builder

Next.js 15 + React + TypeScript + Tailwind CSS + App Router + shadcn/ui project skeleton.

## Current scope

- Home page
- Resume builder route
- Structured resume form
- Realtime resume preview
- OpenAI optimization API route
- PDF export service placeholder
- Share profile service now supports server-side public resume storage
- Modular structure ready for auth later

## Environment variables

Copy `.env.example` to `.env.local` and configure:

```env
OPENAI_API_KEY=
OPENAI_RESUME_MODEL=gpt-4o-mini
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### OpenAI configuration

- Create an API key at https://platform.openai.com/api-keys.
- Paste the key into `OPENAI_API_KEY` in `.env.local`.
- `OPENAI_RESUME_MODEL` controls the model used by the resume optimization API. The default `gpt-4o-mini` is suitable for local development.
- `NEXT_PUBLIC_APP_URL` is used for share links and local preview URLs.
- Keep `.env.local` local-only and do not commit it to Git. The project already ignores this file.

If the key is missing or invalid, the AI optimization route will return an error message instead of generating suggestions.

## Local development

1. Run `npm install`.
2. Run `npm run dev`.
3. Open `http://localhost:3000`.

## Share resume publicly

- Use the builder page and click `生成分享页` to create a public resume link.
- During local development, shared resumes persist in `.resume-shares.json`.
- On Vercel, the app can use Vercel KV for durable shared-resume storage.
- Set `NEXT_PUBLIC_APP_URL` in `.env.local` or Vercel environment settings to your deployed site URL.
- Set `VERCEL_KV_URL` and `VERCEL_KV_TOKEN` in Vercel if you want shared resumes to persist across deployments.
- Deploy to Vercel and share `/resume/[slug]` with friends.
