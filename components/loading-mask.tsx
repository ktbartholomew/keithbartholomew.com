"use client";

import { useEffect } from "react";

export default function LoadingMask() {
  useEffect(() => {
    let interval: any;
    let lines = 0;

    interval = setInterval(() => {
      const el = document.getElementById("loading-mask");
      if (!el) {
        clearInterval(interval);
        return;
      }
      el.style.height = `calc(100vh - ${lines}rem)`;

      if (el.getBoundingClientRect().height < 1) {
        clearInterval(interval);
      }

      lines++;
    }, 20);
  }, []);
  return (
    <div
      id="loading-mask"
      className="bg-slate-900 fixed bottom-0 left-0 w-[100vw]"
    ></div>
  );
}
