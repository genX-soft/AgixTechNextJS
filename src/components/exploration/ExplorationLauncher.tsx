"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ExplorationModal = dynamic(() => import("./ExplorationModal"), {
  ssr: false,
});

export default function ExplorationLauncher() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <ExplorationModal />;
}
