"use client";

import { useState, useEffect } from "react";
import ExplorationModal from "./ExplorationModal";

export default function ExplorationLauncher() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <ExplorationModal />;
}
