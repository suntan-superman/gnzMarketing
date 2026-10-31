"use client";

import { trackEvent } from "@/lib/analytics";

export default function TrackedAnchor({ eventName, eventParams, onClick, ...props }) {
  return <a {...props} onClick={(event) => { trackEvent(eventName, eventParams); onClick?.(event); }} />;
}
