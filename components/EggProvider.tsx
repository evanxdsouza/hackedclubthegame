"use client"

import{ createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "directive-progress";

type EggContextType = {
    found : Set<string>;
    foundEgg: (id: string) => void;
    hasFound: (id: string) => boolean:
};

const EggContext = createContext<EggContextType | null>(null);

export function EggProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState<Set<string>>(new Set());

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setFound(new Set(JSON.parse(raw)));
      } catch {
        // corrupted storage, ignore
      }
    }
  }, []);

    const foundEgg = (id: string) => {
    setFound((prev) => {
      if (prev.has(id)) return prev; // already found, no-op
      const next = new Set(prev).add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const hasFound = (id: string) => found.has(id);

  return (
    <EggContext.Provider value={{ found, foundEgg, hasFound }}>
      {children}
    </EggContext.Provider>
  );
}

export function useEggs() {
  const ctx = useContext(EggContext);
  if (!ctx) throw new Error("useEggs must be used within EggProvider");
  return ctx;
}

