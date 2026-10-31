"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: readonly string[], topOffset = 72): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key.split("|").filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const pick = () => {
      let current = elements[0].id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top - topOffset <= 1) current = element.id;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(pick, {
      rootMargin: `-${topOffset}px 0px 0px 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    elements.forEach((element) => observer.observe(element));

    pick();
    return () => observer.disconnect();
  }, [key, topOffset]);

  return active;
}