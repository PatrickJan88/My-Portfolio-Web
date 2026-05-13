This folder is dedicated to storing images and media for the various case studies (projects).

### Usage Instructions

1. **Create Subfolders (Optional but recommended):**
   For better organization, nest your images inside subfolders named after the project ID.
   *Example:*
   - `public/projects/urgent-booking/media-1.webp`
   - `public/projects/agent-zero/hero-video.webm`

2. **Referencing in Code:**
   Because these files are in the `public` directory, you **do not** need to `import` them in your React components.
   You can reference them directly using an absolute path starting with `/`.

   *Example Usage in React:*
   ```tsx
   <img src="/projects/urgent-booking/media-1.webp" alt="Urgent Booking Media 1" />
   ```

   *Example Usage in your Data Files (`src/data/projects/*.ts`):*
   ```ts
   export const urgentBooking: Project = {
     // ...
     media1: "/projects/urgent-booking/media-1.webp",
     // ...
   }
   ```
