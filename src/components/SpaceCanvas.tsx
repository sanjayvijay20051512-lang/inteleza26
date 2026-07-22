import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SpaceCanvasProps {
  zoomLevel: number; // 1 to 5 (or higher for fly-through)
  isInsideSymposium: boolean;
}

export const SpaceCanvas: React.FC<SpaceCanvasProps> = ({ zoomLevel, isInsideSymposium }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ 
    x: window.innerWidth / 2, 
    y: window.innerHeight / 2, 
    tx: window.innerWidth / 2, 
    ty: window.innerHeight / 2 
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Starfield definitions (Dynamic responsive stars)
    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.01 + 0.005,
      });
    }

    // 1. Interactive Swarm Particles: Constantly following the cursor with spring physics
    const swarmParticles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      angle: number;
      orbitSpeed: number;
      orbitRadius: number;
      spring: number;
      friction: number;
    }[] = [];

    const colors = [
      "rgba(6, 182, 212, ",  // Cyan
      "rgba(59, 130, 246, ",  // Blue
      "rgba(168, 85, 247, ", // Purple
      "rgba(253, 224, 71, ",  // Gold
    ];

    for (let i = 0; i < 40; i++) {
      swarmParticles.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.5,
        angle: Math.random() * Math.PI * 2,
        orbitSpeed: Math.random() * 0.015 + 0.005,
        orbitRadius: Math.random() * 60 + 20,
        spring: Math.random() * 0.02 + 0.01,
        friction: Math.random() * 0.04 + 0.9,
      });
    }

    // 2. Interactive Sparks Trail: Spawned when the cursor moves
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
      maxLife: number;
    }
    const sparks: Spark[] = [];

    let lastMouseX = mouseRef.current.tx;
    let lastMouseY = mouseRef.current.ty;

    // Track resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse & emit trailing sparks
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;

      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2) {
        // Spawn sparks in proportional frequency
        const spawnCount = Math.min(3, Math.floor(speed / 5) + 1);
        for (let i = 0; i < spawnCount; i++) {
          sparks.push({
            x: e.clientX,
            y: e.clientY,
            vx: -dx * 0.15 + (Math.random() - 0.5) * 2,
            vy: -dy * 0.15 + (Math.random() - 0.5) * 2,
            size: Math.random() * 2.5 + 1.0,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1.0,
            life: 0,
            maxLife: Math.floor(Math.random() * 20 + 15),
          });
        }
      }

      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Loop callback for GSAP Ticker
    const draw = () => {
      // Clear background
      ctx.fillStyle = isInsideSymposium ? "#010103" : "#000001";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse damping for elegant lag-behind inertia
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.08;

      // 1. Dynamic Cursor Ambient Glow
      const ambientGlow = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        350
      );
      ambientGlow.addColorStop(0, "rgba(6, 182, 212, 0.14)");
      ambientGlow.addColorStop(0.5, "rgba(168, 85, 247, 0.07)");
      ambientGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Stars with beautiful parallax drift
      for (let s of stars) {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
        s.alpha = Math.max(0, Math.min(1, s.alpha));

        // Parallax offset based on cursor position relative to center
        const parallaxX = (mouseRef.current.x - width / 2) * 0.04 * s.size;
        const parallaxY = (mouseRef.current.y - height / 2) * 0.04 * s.size;

        // Wrap around screen boundaries seamlessly
        const drawX = (s.x - parallaxX + width) % width;
        const drawY = (s.y - parallaxY + height) % height;

        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update swarm particles position
      for (const p of swarmParticles) {
        p.angle += p.orbitSpeed;
        const targetX = mouseRef.current.x + Math.cos(p.angle) * p.orbitRadius;
        const targetY = mouseRef.current.y + Math.sin(p.angle) * p.orbitRadius;

        // Apply spring forces
        p.vx += (targetX - p.x) * p.spring;
        p.vy += (targetY - p.y) * p.spring;

        // Apply friction damping
        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx;
        p.y += p.vy;
      }

      // Update sparks trail position
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy -= 0.02; // subtle rising float drift
        s.vx *= 0.95; // air resistance
        s.vy *= 0.95;
        s.life++;
        s.alpha = 1 - s.life / s.maxLife;

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
        }
      }

      // Get combined active nodes for filament connection
      const swarmCoords = swarmParticles.map(p => ({ x: p.x, y: p.y, size: p.size, alpha: p.alpha }));
      const sparkCoords = sparks.map(s => ({ x: s.x, y: s.y, size: s.size, alpha: s.alpha }));
      const allNodes = [...swarmCoords, ...sparkCoords];

      // Draw connection lines between nearby points
      const maxDistance = 85;
      for (let i = 0; i < allNodes.length; i++) {
        const n1 = allNodes[i];
        for (let j = i + 1; j < allNodes.length; j++) {
          const n2 = allNodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const jointAlpha = (1 - dist / maxDistance) * 0.16 * Math.min(n1.alpha, n2.alpha);
            ctx.strokeStyle = `rgba(6, 182, 212, ${jointAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw permanent swarm particles
      for (const p of swarmParticles) {
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo around largest ones
        if (p.size > 2.0) {
          ctx.fillStyle = `${p.color}${p.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw fading sparks trail
      for (const s of sparks) {
        ctx.fillStyle = `${s.color}${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - s.life / s.maxLife), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Use GSAP Ticker for smooth high-performance synced frame rates
    gsap.ticker.add(draw);

    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [zoomLevel, isInsideSymposium]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      id="space-canvas"
    />
  );
};
