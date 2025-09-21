# Quizio

A simple web app I made for our college event to organize and access different topic presentations.

## What it does

- Shows different topics in a clean 2x2 grid
- Click on any topic to open the presentation (PDF or PowerPoint)
- Supports both local files and Google Drive links
- Simple navigation with back/forward options

## How to use

1. **Start the app:**
   ```bash
   pnpm dev
   ```

2. **Add your presentations:**
   - Put PDF/PowerPoint files in the `public/presentations/` folder, OR
   - Use Google Drive links (see below)

3. **Update topics:**
   - Edit `client/data/categories.ts` to add your topics and file paths

## Google Drive Setup

To use Google Drive files:
1. Upload your file to Google Drive
2. Right-click → Share → Get link → "Anyone with the link can view"
3. Copy the link (looks like: `https://drive.google.com/file/d/FILE_ID/view`)
4. Use this format: `https://drive.google.com/file/d/FILE_ID/preview`

## Tech used

- React + TypeScript
- Vite for development
- Tailwind CSS for styling
- Framer Motion for animations