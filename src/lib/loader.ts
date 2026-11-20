// Global loader state. It lives at module level (not inside a component) on purpose:
// on a language switch the [locale] layout remounts, and a component's own state would be lost
// mid-loader. Here the state survives, so the overlay can really stay up for its minimum time.
//
// Use it for anything that is not a link click (form submit, fetch ...):
//   startLoader('bar'); try { await fetch(...) } finally { stopLoader(); }
export type LoaderMode = 'bar' | 'overlay';
export type LoaderState = { mode: LoaderMode | null; done: boolean };

// Minimum time the loader stays visible, per mode (ms)
export const MIN_VISIBLE: Record<LoaderMode, number> = { bar: 280, overlay: 1000 };
const SAFETY = 10000; // never leave it stuck
const FADE = 250; // fade-out time, must match the css

const IDLE: LoaderState = { mode: null, done: false };
let state: LoaderState = IDLE;
let active = false;
let stopping = false;
let startedAt = 0;
let timers: number[] = [];
const subs = new Set<() => void>();

const set = (s: LoaderState) => {
  state = s;
  subs.forEach((f) => f());
};
const clear = () => {
  timers.forEach((t) => window.clearTimeout(t));
  timers = [];
};

function finish() {
  clear();
  active = false;
  stopping = false;
  set({ mode: state.mode, done: true });
  timers.push(window.setTimeout(() => set(IDLE), FADE));
}

export function startLoader(mode: LoaderMode = 'bar') {
  if (typeof window === 'undefined') return;
  if (active && !stopping) {
    // a language switch while the bar is running: upgrade to the overlay
    if (mode === 'overlay' && state.mode !== 'overlay') {
      startedAt = Date.now();
      set({ mode, done: false });
    }
    return;
  }
  clear();
  active = true;
  stopping = false;
  startedAt = Date.now();
  set({ mode, done: false });
  timers.push(window.setTimeout(finish, SAFETY));
}

export function stopLoader() {
  if (typeof window === 'undefined' || !active || stopping || !state.mode) return;
  stopping = true;
  const wait = Math.max(0, startedAt + MIN_VISIBLE[state.mode] - Date.now());
  clear();
  timers.push(window.setTimeout(finish, wait));
}

export const subscribeLoader = (fn: () => void) => {
  subs.add(fn);
  return () => void subs.delete(fn);
};
export const getLoaderState = () => state;
export const getServerLoaderState = () => IDLE;
