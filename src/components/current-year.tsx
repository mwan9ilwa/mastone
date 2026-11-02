"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Prerenders a fixed year and swaps in the visitor's current year on the client. */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026
  );
  return <>{year}</>;
}
