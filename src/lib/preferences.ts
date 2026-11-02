"use client";

import { useSyncExternalStore } from "react";

export type PageLength = "full" | "short";

const LENGTH_KEY = "page-length";
const KEYS_KEY = "number-keys";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Storage can throw outright in a private window, and neither preference is
// worth breaking the page over.
const read = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

const getPageLength = (): PageLength =>
  document.documentElement.dataset.view === "short" ? "short" : "full";

export const usePageLength = () =>
  useSyncExternalStore(subscribe, getPageLength, () => "full" as PageLength);

/** The section whose top is nearest the reading line, used to hold your place. */
const findAnchor = () => {
  const line = window.innerHeight * 0.3;
  let anchor: Element | null = null;
  for (const element of document.querySelectorAll("main section[id]")) {
    // A section hidden in the short version measures at 0, which would otherwise
    // make it look like the one being read.
    if (!element.getClientRects().length) continue;
    if (element.getBoundingClientRect().top > line) break;
    anchor = element;
  }
  return anchor;
};

/**
 * Switches length inside a view transition. The names that let each section
 * morph are only switched on for the duration (see `.view-switching` in
 * globals.css): left on permanently, they would paint above the theme toggle's
 * circular reveal, which needs the root to be the only thing transitioning.
 */
export function setPageLength(next: PageLength) {
  const root = document.documentElement;

  const apply = () => {
    const anchor = findAnchor();
    const before = anchor?.getBoundingClientRect().top ?? 0;

    if (next === "short") root.dataset.view = "short";
    else delete root.dataset.view;
    write(LENGTH_KEY, next);

    // Half the page may have just appeared or vanished above the reader.
    if (anchor) {
      window.scrollBy({
        top: anchor.getBoundingClientRect().top - before,
        behavior: "instant",
      });
    }
    notify();
  };

  if (!document.startViewTransition) {
    apply();
    return;
  }

  root.classList.add("view-switching");
  document
    .startViewTransition(apply)
    .finished.finally(() => root.classList.remove("view-switching"));
}

const getNumberKeysEnabled = () => read(KEYS_KEY) !== "off";

/**
 * Single-character shortcuts need an off switch (WCAG 2.1.4): speech input can
 * fire them by accident, and a stray "3" should not throw someone down the page.
 */
export const useNumberKeysEnabled = () =>
  useSyncExternalStore(subscribe, getNumberKeysEnabled, () => true);

export function setNumberKeysEnabled(enabled: boolean) {
  write(KEYS_KEY, enabled ? "on" : "off");
  notify();
}
