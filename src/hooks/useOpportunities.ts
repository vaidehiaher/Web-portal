// src/hooks/useOpportunities.ts
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase";
import type { OpportunityMatch } from "../types";

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<OpportunityMatch[]>([]);

  useEffect(() => {
    const oppRef = ref(db, "opportunities");
    // onValue returns an unsubscribe function
    const unsubscribe = onValue(oppRef, (snapshot) => {
      const data = snapshot.val() || {};
      const arr: OpportunityMatch[] = Object.entries(data).map(([key, value]) => {
        const item: any = value;
        return {
          id: key,
          title: item.title || item.name || "",
          type: (item.type as any) || "job",
          matchPercentage: item.matchPercentage ?? 0,
          reasons: item.reasons ?? [],
          missingSkills: item.missingSkills ?? [],
          applicationDeadline: item.applicationDeadline ? new Date(item.applicationDeadline) : new Date()
        };
      });

      // Optional: sort by deadline
      arr.sort((a, b) => a.applicationDeadline.getTime() - b.applicationDeadline.getTime());
      setOpportunities(arr);
    });

    return () => {
      try { unsubscribe(); } catch { /* ignore */ }
    };
  }, []);

  return opportunities;
}
