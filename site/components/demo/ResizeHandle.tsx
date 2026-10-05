"use client";

import { useRef, useState } from "react";

/**
 * ResizeHandle — 9px 命中区 + 1px 视觉线（research/02）。
 * pointer capture 拖拽，宽度 clamp 交给 reducer。
 */
export function ResizeHandle({
  width,
  onResize,
}: {
  width: number;
  onResize: (width: number) => void;
}) {
  const drag = useRef<{ startX: number; startW: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      aria-valuenow={Math.round(width)}
      className="z-10 hidden w-[9px] -mr-1 -ml-[5px] flex-shrink-0 cursor-col-resize touch-none justify-center md:flex"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        drag.current = { startX: e.clientX, startW: width };
        setDragging(true);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        onResize(drag.current.startW + (e.clientX - drag.current.startX));
      }}
      onPointerUp={() => {
        drag.current = null;
        setDragging(false);
      }}
      onPointerCancel={() => {
        drag.current = null;
        setDragging(false);
      }}
    >
      <div
        className={`w-px self-stretch transition-colors ${
          dragging ? "bg-accent" : "bg-line hover:bg-line-strong"
        }`}
      />
    </div>
  );
}
