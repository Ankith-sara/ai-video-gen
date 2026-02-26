# AI Short Video Generator

> Type a prompt → get a rendered 1080p short video, automatically.

A serverless video generation platform that turns text descriptions into fully composed short-form videos — no timeline editor, no manual cuts. Built with **Next.js**, **Remotion**, **Convex**, and **Inngest**.

---

## What It Does

Video creation is slow and repetitive by default: write a script, assemble scenes, export, repeat. This project automates the entire pipeline — from prompt to rendered 1080p output — using AI-generated scene structure and programmatic frame rendering. The async job architecture means renders never block the UI and can scale to handle large or concurrent requests.

---

## How It Works

```
User Prompt
   ↓
AI Script + Scene Generation
   ↓
Scene Configuration (JSON)
   ↓
Background Job Trigger (Inngest)
   ↓
Remotion Frame-by-Frame Rendering
   ↓
1080p Video Output
```

1. You submit a **text prompt**
2. AI converts it into a **script and scene structure**
3. Scene data is stored and an **async background job is triggered via Inngest**
4. **Remotion** renders the video frame-by-frame using React components
5. The finished **1080p video** is stored and made available for preview or download

The async flow keeps the frontend responsive during long renders and makes the pipeline easy to scale.

---

## Tech Stack

| Layer           | Technology                     |
| --------------- | ------------------------------ |
| Frontend        | Next.js                        |
| Video Rendering | Remotion                       |
| Backend         | Convex                         |
| Background Jobs | Inngest                        |
| Database        | Firebase                       |
| Styling         | Tailwind CSS                   |
| AI Integration  | API-based (text → scene logic) |

---

## Project Structure

```
app/          → Next.js routes and pages
components/   → UI and video components
remotion/     → Video compositions and scenes
convex/       → Backend queries and mutations
inngest/      → Background job workflows
lib/          → Utility and AI-related logic
styles/       → Tailwind and global styles
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd short-video-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
AI_API_KEY=your_api_key_here
CONVEX_DEPLOYMENT=your_convex_url
FIREBASE_CONFIG=your_firebase_config
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## What I Learned

- **Remotion's rendering model** — Remotion treats video as a React component tree where time is a prop; building scene compositions this way made it straightforward to map AI-generated JSON directly to visual output without a traditional editing timeline
- **Async job architecture with Inngest** — offloading long-running renders to Inngest background functions kept the UI non-blocking and gave built-in retry logic, which matters for a process that can fail mid-render
- **AI output as structured data** — designing prompts that return a consistent scene schema (duration, text, media cues) rather than freeform descriptions was the key to making the generation → rendering handoff reliable
- **Convex for job state** — using Convex reactive queries to track render job status meant the frontend could update in real time without polling

---

## Use Cases

- Short-form social media content
- Marketing and promotional clips
- Educational explainer videos
- Rapid video prototyping

---

## Roadmap

- [ ] Text-to-speech voiceover integration
- [ ] Multi-language video generation
- [ ] Custom animation timelines
- [ ] Subtitle and caption support
- [ ] One-click export to social platforms

---

## Known Limitations

- Currently optimized for short-form video only
- Limited built-in animation presets
- No voice synthesis pipeline yet
