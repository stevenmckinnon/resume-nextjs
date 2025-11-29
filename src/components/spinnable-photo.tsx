"use client";

import { cn } from "@/lib/utils";
import useBreakpoints from "@/hooks/useBreakpoints";
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
  const { isAboveMd } = useBreakpoints("md");
  const [spin, setSpin] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Track mount state to avoid hydration mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Touch-to-spin functionality for mobile
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(INITIAL_ROTATION);
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 30 });
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track touch state for momentum calculation
  const touchStateRef = useRef({
    startX: 0,
    startY: 0,
    centerX: 0,
    centerY: 0,
    lastAngle: 0,
    velocity: 0,
    lastTime: 0,
    isEdgeTouch: false,
  });

  // Check if touch is near edge/corner (within 30% from edge)
  const isNearEdge = useCallback(
    (touchX: number, touchY: number, rect: DOMRect) => {
      const relX = (touchX - rect.left) / rect.width;
      const relY = (touchY - rect.top) / rect.height;
      const edgeThreshold = 0.3;

      return (
        relX < edgeThreshold ||
        relX > 1 - edgeThreshold ||
        relY < edgeThreshold ||
        relY > 1 - edgeThreshold
      );
    },
    [],
  );

  // Calculate angle from center to touch point
  const getAngle = useCallback(
    (touchX: number, touchY: number, centerX: number, centerY: number) => {
      return Math.atan2(touchY - centerY, touchX - centerX) * (180 / Math.PI);
    },
    [],
  );

  // Calculate nearest "home" position (n * 360 + initial offset)
  const getNearestHomePosition = useCallback((currentRotation: number) => {
    // Remove the initial offset, round to nearest full rotation, add offset back
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

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!imageContainerRef.current || isAboveMd) return;

      const touch = e.touches[0];
      const rect = imageContainerRef.current.getBoundingClientRect();

      // Only enable spinning if touching near edge
      if (!isNearEdge(touch.clientX, touch.clientY, rect)) return;

      // Cancel any pending reset
      cancelReset();

      // Prevent scroll when spinning
      e.preventDefault();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const initialAngle = getAngle(
        touch.clientX,
        touch.clientY,
        centerX,
        centerY,
      );

      touchStateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        centerX,
        centerY,
        lastAngle: initialAngle,
        velocity: 0,
        lastTime: Date.now(),
        isEdgeTouch: true,
      };
    },
    [isAboveMd, isNearEdge, getAngle, cancelReset],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!touchStateRef.current.isEdgeTouch || isAboveMd) return;

      // Prevent scroll while spinning
      e.preventDefault();

      const touch = e.touches[0];
      const { centerX, centerY, lastAngle, lastTime } = touchStateRef.current;

      const currentAngle = getAngle(
        touch.clientX,
        touch.clientY,
        centerX,
        centerY,
      );
      let deltaAngle = currentAngle - lastAngle;

      // Handle angle wrapping at ±180°
      if (deltaAngle > 180) deltaAngle -= 360;
      if (deltaAngle < -180) deltaAngle += 360;

      // Calculate velocity for momentum
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      if (deltaTime > 0) {
        touchStateRef.current.velocity = (deltaAngle / deltaTime) * 1000;
      }

      // Update rotation
      rotation.set(rotation.get() + deltaAngle);

      // Update tracking state
      touchStateRef.current.lastAngle = currentAngle;
      touchStateRef.current.lastTime = currentTime;
    },
    [isAboveMd, getAngle, rotation],
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchStateRef.current.isEdgeTouch || isAboveMd) return;

    const { velocity } = touchStateRef.current;

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

    touchStateRef.current.isEdgeTouch = false;
    touchStateRef.current.velocity = 0;

    // Schedule reset to initial position after inactivity
    scheduleReset();
  }, [isAboveMd, rotation, scheduleReset]);

  // Attach native touch listeners with { passive: false } to enable preventDefault
  useEffect(() => {
    const element = imageContainerRef.current;
    if (!element || isAboveMd) return;

    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [isAboveMd, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Easter egg: ctrl+hover to spin
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      setSpin(true);
    }
  };

  const handleMouseLeave = () => {
    setSpin(false);
  };

  return (
    <motion.div
      style={parallax ? { y: parallax.y, opacity: parallax.opacity, scale: parallax.scale } : undefined}
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

      {/* Main image container with touch-to-spin on mobile */}
      <motion.div
        ref={imageContainerRef}
        className={cn(
          "border-border bg-card/50 relative mx-auto h-full w-full max-w-[280px] rounded-2xl border-2 p-2 shadow-2xl backdrop-blur-sm transition-shadow duration-500 ease-out md:mx-0 md:max-w-none md:transition-all md:hover:scale-105",
          spin && "animate-spin",
          "md:rotate-3 md:hover:rotate-0",
        )}
        style={{
          rotate: hasMounted && !isAboveMd ? smoothRotation : undefined,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[8px]">
          <Image
            alt={alt}
            src={src}
            fill
            className="object-cover object-center"
            priority
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

