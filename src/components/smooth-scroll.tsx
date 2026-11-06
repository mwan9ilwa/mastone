"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        anchors: { offset: -72 },
        wheelMultiplier: 1,
        allowNestedScroll: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
