
---

## 🎯 Final Architecture (Non-Monorepo)

```
frontend/  → Expo app
backend/   → Next.js app (with Prisma + Clerk)
```

---

## ⚙️ Tech Stack

| Area                   | Tool / Library                                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend (Expo)**    | Expo SDK 52+, React Native, Reanimated, Gesture Handler, React Query, MMKV or AsyncStorage, `react-native-track-player`, `expo-file-system`, Clerk Expo SDK |
| **Backend (Next.js)**  | Next.js 15 (App Router), Prisma ORM, PlanetScale / Supabase, Clerk Auth, YouTube Data API / ytdl-core, REST APIs                                            |
| **Storage (Frontend)** | Local only – audio files + metadata cached locally                                                                                                          |
| **Auth**               | Clerk (Google + email)                                                                                                                                      |
| **Deployment**         | Backend → Vercel; Expo → local / EAS build for Android                                                                                                      |

---

## 🧩 Core Features Recap

**Frontend (Expo):**

* 🔸 Dashboard (featured, trending, for-you music)
* 🔸 Search (fetches from backend → YouTube)
* 🔸 History (local last 50)
* 🔸 Offline (downloaded songs)
* 🔸 Settings (theme, cache management)
* 🔸 Collapsible player (Reanimated + TrackPlayer)

**Backend (Next.js):**

* 🔹 `/api/music/search` → queries YouTube API / ytdl-core
* 🔹 `/api/music/stream` → returns audio stream URL
* 🔹 `/api/trending` → tracks searches (for trending)
* 🔹 `/api/user/favourites` → CRUD for artists/categories
* 🔹 `/api/webhooks/clerk` → handle user creation in DB

---

## 🗓️ 30-Day Plan (~80 hours)

### **Week 1 – Backend + Auth Setup (15 hrs)**

**Goal:** Get your backend functional, DB ready, and auth wired up.

#### Day 1–2 (4h)

* Initialize Next.js app (`create-next-app@latest`).
* Setup TypeScript + ESLint + Prettier.
* Add Prisma + PlanetScale or Supabase.
* Create schema:

  * `User`, `FavouriteArtist`, `FavouriteCategory`, `TrendingSearch`, `MusicCategory`.
* Run initial migration and seed sample categories.

#### Day 3–4 (4h)

* Setup **Clerk**:

  * Add Clerk middleware.
  * Implement `/api/webhooks/clerk` → create user in DB.
  * Test login in web (you’ll reuse this logic in Expo later).

#### Day 5–6 (5h)

* Implement APIs:

  * `/api/music/search?q=` → return list from YouTube.
  * `/api/music/stream?id=` → return only audio stream URL.
  * `/api/trending` → aggregate top 10 searches.

#### Day 7 (2h)

* Test APIs in Postman.
* Deploy backend to Vercel with your DB connected.

✅ *Deliverable:* Fully working backend (Clerk, Prisma, YouTube endpoints).

---

### **Week 2 – Expo Base + Auth + Player (20 hrs)**

**Goal:** Build skeleton app + login + audio playback.

#### Day 8–9 (4h)

* Initialize **Expo project**.
* Setup React Navigation (bottom tabs): Dashboard, Search, History, Offline, Settings.
* Add theming (light/dark).

#### Day 10 (3h)

* Integrate **Clerk Expo SDK** (Google login + token persistence).
* Store user token locally (MMKV).

#### Day 11–12 (6h)

* Integrate `react-native-track-player`:

  * Setup background mode.
  * Test local + remote audio URL playback.
  * Add play/pause controls.

#### Day 13–14 (5h)

* Implement **collapsible music player** (Reanimated + Gesture Handler).

  * Mini player at bottom.
  * Full player with artwork + controls.

#### Day 15 (2h)

* Create API client with React Query + axios.
* Test a call to `/api/music/search` from your Expo app.

✅ *Deliverable:* Auth + music playback + working API call.

---

### **Week 3 – Core Features (25 hrs)**

**Goal:** Add search, offline, dashboard, and trending logic.

#### Day 16–17 (5h)

* **Search Screen:**

  * Input field + results list.
  * Fetch from `/api/music/search`.
  * On tap → play via stream URL.
  * Store every search query → send to `/api/trending`.

#### Day 18–19 (6h)

* **Offline mode:**

  * Use `expo-file-system` to save downloaded audio.
  * Save metadata (title, artist, duration, thumbnail) in MMKV.
  * Offline screen → lists downloaded files + delete option.

#### Day 20–21 (6h)

* **Dashboard:**

  * Fetch `/api/trending` and `/api/user/favourites`.
  * Show sections: Trending, For You, Featured.
  * Add “Add to Favourites” button for artists/categories.

#### Day 22 (4h)

* **History:**

  * Keep last 50 played tracks (in MMKV).
  * Show time ago + quick replay button.

#### Day 23 (4h)

* **Error handling + loading UI**:

  * Create a minimal Loader + ErrorFallback component (use shadcn-inspired styles).

✅ *Deliverable:* App functional end-to-end (search → play → save → offline).

---

### **Week 4 – Polish, Settings, and Offline-first (20 hrs)**

**Goal:** Make it smooth, cache-aware, and usable offline.

#### Day 24–25 (5h)

* Add **Network detection** (`@react-native-community/netinfo`).
* When offline → use cached trending + offline music only.

#### Day 26–27 (6h)

* **Settings screen:**

  * Toggle theme.
  * Manage cache (show storage used, clear all downloads).
  * About / version info.

#### Day 28 (4h)

* Small **optimizations:**

  * Cache last trending & dashboard data.
  * Lazy-load player images.
  * Debounce search inputs.

#### Day 29–30 (5h)

* Manual testing + debugging.
* Build production Expo app (`eas build`).
* Final polish (icons, splash screen, etc).

✅ *Deliverable:* Fully functional offline-first YouTube audio player.

---

## 📊 Summary of Milestones

| Week  | Focus                | Outcome                             |
| ----- | -------------------- | ----------------------------------- |
| **1** | Backend + Auth       | Ready backend + APIs deployed       |
| **2** | Expo base + Playback | Auth + player working               |
| **3** | Core features        | Search, offline, dashboard, history |
| **4** | Offline polish       | Settings, caching, final testing    |

---

## 💡 Tips for Success

* **Use MMKV**, not AsyncStorage — faster and better for offline music metadata.
* **Skip unit tests** (as you said) — focus on manual validation.
* **Clone UI** from apps like Spotify or YouTube Music for inspiration.
* **Commit daily**, even tiny changes — keeps momentum.
* **Track progress** in Notion or Markdown (daily 2–3 bullet journal style).

---
