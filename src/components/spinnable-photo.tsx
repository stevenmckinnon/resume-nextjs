"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface SpinnablePhotoProps {
  src: string;
  alt: string;
  className?: string;
  /** Parallax values from parent scroll tracking */
  parallax?: {
    y: MotionValue<number>;
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
  };
}

const INITIAL_ROTATION = 3;
const RESET_DELAY_MS = 2500;

export const SpinnablePhoto = ({
  src,
  alt,
  className,
  parallax,
}: SpinnablePhotoProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(INITIAL_ROTATION);
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 30 });
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track drag state for momentum calculation
  const dragStateRef = useRef({
    centerX: 0,
    centerY: 0,
    lastAngle: 0,
    velocity: 0,
    lastTime: 0,
    isDragging: false,
  });

  // Check if pointer is near edge/corner (within 30% from edge)
  const isNearEdge = useCallback((x: number, y: number, rect: DOMRect) => {
    const relX = (x - rect.left) / rect.width;
    const relY = (y - rect.top) / rect.height;
    const edgeThreshold = 0.3;

    return (
      relX < edgeThreshold ||
      relX > 1 - edgeThreshold ||
      relY < edgeThreshold ||
      relY > 1 - edgeThreshold
    );
  }, []);

  // Calculate angle from center to pointer
  const getAngle = useCallback(
    (x: number, y: number, centerX: number, centerY: number) => {
      return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    },
    [],
  );

  // Calculate nearest "home" position (n * 360 + initial offset)
  const getNearestHomePosition = useCallback((currentRotation: number) => {
    const rotationsFromHome = (currentRotation - INITIAL_ROTATION) / 360;
    const nearestFullRotation = Math.round(rotationsFromHome);
    return nearestFullRotation * 360 + INITIAL_ROTATION;
  }, []);

  // Schedule reset to nearest home position after inactivity
  const scheduleReset = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = setTimeout(() => {
      const currentRotation = rotation.get();
      const targetRotation = getNearestHomePosition(currentRotation);

      animate(rotation, targetRotation, {
        type: "spring",
        stiffness: 100,
        damping: 20,
      });
    }, RESET_DELAY_MS);
  }, [rotation, getNearestHomePosition]);

  // Cancel reset when user starts interacting
  const cancelReset = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, []);

  // Start drag (shared logic for touch and mouse)
  const startDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!imageContainerRef.current) return false;

      const rect = imageContainerRef.current.getBoundingClientRect();

      // Only enable spinning if near edge
      if (!isNearEdge(clientX, clientY, rect)) return false;

      cancelReset();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const initialAngle = getAngle(clientX, clientY, centerX, centerY);

      dragStateRef.current = {
        centerX,
        centerY,
        lastAngle: initialAngle,
        velocity: 0,
        lastTime: Date.now(),
        isDragging: true,
      };

      return true;
    },
    [isNearEdge, getAngle, cancelReset],
  );

  // Move drag (shared logic for touch and mouse)
  const moveDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragStateRef.current.isDragging) return;

      const { centerX, centerY, lastAngle, lastTime } = dragStateRef.current;

      const currentAngle = getAngle(clientX, clientY, centerX, centerY);
      let deltaAngle = currentAngle - lastAngle;

      // Handle angle wrapping at ±180°
      if (deltaAngle > 180) deltaAngle -= 360;
      if (deltaAngle < -180) deltaAngle += 360;

      // Calculate velocity for momentum
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      if (deltaTime > 0) {
        dragStateRef.current.velocity = (deltaAngle / deltaTime) * 1000;
      }

      rotation.set(rotation.get() + deltaAngle);

      dragStateRef.current.lastAngle = currentAngle;
      dragStateRef.current.lastTime = currentTime;
    },
    [getAngle, rotation],
  );

  // End drag (shared logic for touch and mouse)
  const endDrag = useCallback(() => {
    if (!dragStateRef.current.isDragging) return;

    const { velocity } = dragStateRef.current;

    // Apply momentum animation with inertia
    if (Math.abs(velocity) > 50) {
      const currentRotation = rotation.get();
      const momentumRotation = currentRotation + velocity * 0.5;

      animate(rotation, momentumRotation, {
        type: "inertia",
        velocity: velocity,
        power: 0.3,
        timeConstant: 200,
        restDelta: 0.5,
        bounceStiffness: 300,
        bounceDamping: 40,
      });
    }

    dragStateRef.current.isDragging = false;
    dragStateRef.current.velocity = 0;

    scheduleReset();
  }, [rotation, scheduleReset]);

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      if (startDrag(touch.clientX, touch.clientY)) {
        e.preventDefault();
      }
    },
    [startDrag],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!dragStateRef.current.isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
    },
    [moveDrag],
  );

  const handleTouchEnd = useCallback(() => {
    endDrag();
  }, [endDrag]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (startDrag(e.clientX, e.clientY)) {
        e.preventDefault();
      }
    },
    [startDrag],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      moveDrag(e.clientX, e.clientY);
    },
    [moveDrag],
  );

  const handleMouseUp = useCallback(() => {
    endDrag();
  }, [endDrag]);

  // Attach event listeners
  useEffect(() => {
    const element = imageContainerRef.current;
    if (!element) return;

    // Touch events (with passive: false for preventDefault)
    element.addEventListener("touchstart", handleTouchStart, { passive: false });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    // Mouse events - mousedown on element, move/up on document for drag outside
    element.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      element.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  ]);

  return (
    <motion.div
      style={
        parallax
          ? { y: parallax.y, opacity: parallax.opacity, scale: parallax.scale }
          : undefined
      }
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={cn(
        "relative order-1 mb-8 h-[280px] w-full md:order-2 md:mb-0 md:h-[400px] md:w-full lg:order-2 lg:mb-0 lg:h-[600px] lg:w-full",
        className,
      )}
    >
      {/* Gradient glow */}
      <div className="from-primary/20 via-secondary/10 to-accent/10 absolute inset-0 rounded-full bg-linear-to-tr opacity-50 blur-3xl" />

      {/* Spinnable image container */}
      <motion.div
        ref={imageContainerRef}
        className={cn(
          "border-border bg-card/50 relative mx-auto h-full w-full max-w-[280px] cursor-grab rounded-2xl border-2 p-2 shadow-2xl backdrop-blur-sm transition-shadow duration-500 ease-out active:cursor-grabbing md:mx-0 md:max-w-none",
        )}
        style={{
          rotate: hasMounted ? smoothRotation : undefined,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[8px]">
          <Image
            alt={alt}
            src={src}
            fill
            className="pointer-events-none object-cover object-center select-none"
            priority
            draggable={false}
          />

          {/* Overlay gradient */}
          <div className="from-background/80 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-40" />
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="border-border bg-card/90 absolute -right-4 bottom-1/4 hidden rounded-lg border px-4 py-2 shadow-xl backdrop-blur-sm md:block"
      >
        <p className="text-muted-foreground font-mono text-xs">Based in</p>
        <p className="font-display text-foreground font-bold">
          Glasgow, Scotland 🏴󠁧󠁢󠁳󠁣󠁴󠁿
        </p>
      </motion.div>
    </motion.div>
  );
};
