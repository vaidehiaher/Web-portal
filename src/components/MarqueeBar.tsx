// src/components/MarqueeBar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/marquee.css";

type Workshop = { id: string; title: string; date?: string };

const DEFAULT_WORKSHOPS: Workshop[] = [
  { id: "aptitude", title: "Aptitude Training Workshop", date: "Sep 15, 2025" },
  { id: "resume", title: "Resume Building Seminar", date: "Sep 22, 2025" },
  { id: "mock-interview", title: "Mock Interview Session", date: "Oct 01, 2025" },
];

export const MarqueeBar: React.FC<{ items?: Workshop[] }> = ({ items = DEFAULT_WORKSHOPS }) => {
  const navigate = useNavigate();

  // duplicate the list to make marquee feel continuous
  const itemsToShow = items.concat(items);

  return (
    <div className="marquee" role="region" aria-label="Upcoming workshops and seminars">
      <div className="marquee__track">
        {itemsToShow.map((w, i) => (
          <div className="marquee__item" key={`${w.id}-${i}`}>
            <span className="headline">{w.title}{w.date ? ` — ${w.date}` : ""}</span>
            <button
              className="register-btn"
              onClick={() => navigate(`/register?workshop=${encodeURIComponent(w.title)}&id=${w.id}&date=${encodeURIComponent(w.date || "")}`)}
              aria-label={`Register now for ${w.title}`}
            >
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
