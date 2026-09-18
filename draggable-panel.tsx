"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { GripHorizontal, RotateCcw } from "lucide-react";

interface DraggablePanelProps {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  className?: string;
  id?: string;
  handleClassName?: string;
  enableReset?: boolean;
}

export default function DraggablePanel({
  children,
  initialX = 0,
  initialY = 0,
  className = "",
  id = "drag-panel",
  handleClassName = "",
  enableReset = false,
}: DraggablePanelProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Don't drag if clicking buttons, inputs, selects, or textareas
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest("a")
      ) {
        return;
      }

      e.preventDefault();
      setIsDragging(true);
      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        startX: position.x,
        startY: position.y,
      };
    },
    [position]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest("a")
      ) {
        return;
      }

      const touch = e.touches[0];
      setIsDragging(true);
      dragStartRef.current = {
        mouseX: touch.clientX,
        mouseY: touch.clientY,
        startX: position.x,
        startY: position.y,
      };
    },
    [position]
  );

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      const newX = dragStartRef.current.startX + dx;
      const newY = dragStartRef.current.startY + dy;

      setPosition({ x: newX, y: newY });
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.mouseX;
      const dy = touch.clientY - dragStartRef.current.mouseY;

      const newX = dragStartRef.current.startX + dx;
      const newY = dragStartRef.current.startY + dy;

      setPosition({ x: newX, y: newY });
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging]);

  const resetPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPosition({ x: initialX, y: initialY });
  };

  return (
    <div
      ref={panelRef}
      className={`fixed z-[1000] select-none ${className} ${
        isDragging ? "cursor-grabbing opacity-95 scale-[1.01]" : ""
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        touchAction: isDragging ? "none" : "auto",
      }}
    >
      {/* Drag Bar Handle */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className={`w-full flex items-center justify-between px-2.5 py-1 bg-slate-900/90 border-b border-slate-700/60 rounded-t-2xl cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-200 transition ${handleClassName}`}
        title="Click and drag to move anywhere on screen (Double-click to reset)"
        onDoubleClick={resetPosition}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider">
          <GripHorizontal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="hidden sm:inline text-slate-400">DRAG PANEL</span>
        </div>

        {(position.x !== initialX || position.y !== initialY) && (
          <button
            onClick={resetPosition}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Reset position"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Main Panel Content */}
      {children}
    </div>
  );
}
