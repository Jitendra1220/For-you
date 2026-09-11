import React, { useEffect, useRef } from 'react';

interface BackgroundStarsProps {
  intensity?: number;
  highlightHeartBurst?: boolean;
}

export const BackgroundStars: React.FC<BackgroundStarsProps> = ({ highlightHeartBurst = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate stars
    const numStars = Math.min(120, Math.floor((width * height) / 12000));
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.15 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? '#EADECB' : '#E8A598',
    }));

    // Floating warm embers / glowing dust
    const numEmbers = 25;
    const embers = Array.from({ length: numEmbers }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.4 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      color: Math.random() > 0.5 ? 'rgba(184, 51, 88, ' : 'rgba(234, 222, 203, ',
    }));

    let tick = 0;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      // Soft ambient burgundy vignette glow around mouse
      const radialGlow = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        Math.max(width, height) * 0.45
      );
      radialGlow.addColorStop(0, 'rgba(100, 24, 43, 0.14)');
      radialGlow.addColorStop(0.5, 'rgba(40, 12, 22, 0.06)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Fixed subtle background ambient blobs
      const centerGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        0,
        width * 0.5,
        height * 0.4,
        width * 0.55
      );
      centerGlow.addColorStop(0, 'rgba(94, 27, 44, 0.09)');
      centerGlow.addColorStop(0.7, 'rgba(18, 10, 19, 0.02)');
      centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        const currentAlpha = star.alpha + Math.sin(tick * star.twinkleSpeed + star.twinkleOffset) * 0.25;
        const clampedAlpha = Math.max(0.1, Math.min(0.95, currentAlpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.shadowBlur = 4;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      // Draw floating embers
      embers.forEach((ember) => {
        ember.x += ember.vx;
        ember.y += ember.vy;

        if (ember.y < -10) {
          ember.y = height + 10;
          ember.x = Math.random() * width;
        }
        if (ember.x < -10) ember.x = width + 10;
        if (ember.x > width + 10) ember.x = -10;

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${ember.alpha})`;
        ctx.globalAlpha = ember.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(184, 51, 88, 0.6)';
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [highlightHeartBurst]);

  return (
    <canvas
      ref={canvasRef}
      id="cosmic-background-canvas"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
