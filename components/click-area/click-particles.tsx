"use client";

import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/formatters";

interface Particle {
  id: number;
  x: number;
  y: number;
  value: number;
  opacity: number;
  scale: number;
  isBonus: boolean;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
  isPassive?: boolean;
}

export function useClickParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .filter((p) => p.opacity > 0)
          .map((p) => ({
            ...p,
            x: p.x + p.velocityX,
            y: p.y + p.velocityY,
            velocityY: p.velocityY + 0.1, // gravity
            opacity: p.opacity - 0.015,
            scale: p.scale + 0.01,
            rotation: p.rotation + p.rotationSpeed,
          })),
      );

      animationFrameId = requestAnimationFrame(updateParticles);
    };

    animationFrameId = requestAnimationFrame(updateParticles);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const addPassiveParticle = (
    containerWidth: number,
    bottomY: number,
    value: number,
  ) => {
    const id = Date.now() + Math.random();
    const x = Math.random() * containerWidth;

    setParticles((prev) => [
      ...prev,
      {
        id,
        x,
        y: bottomY,
        value,
        opacity: 1,
        scale: 0.7,
        isBonus: false,
        isPassive: true,
        velocityX: (Math.random() * 2 - 1) * 0.5,
        velocityY: -2 - Math.random() * 1,
        rotation: Math.random() * 10 - 5,
        rotationSpeed: (Math.random() * 2 - 1) * 0.2,
      },
    ]);
  };

  const addParticle = (
    x: number,
    y: number,
    value: number,
    isBonus: boolean = false,
  ) => {
    const particleCount = isBonus ? 4 : 1;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const id = Date.now() + Math.random();
      const isBonusParticle = i === 0 ? isBonus : false;

      const angle = isBonus
        ? (Math.PI * 2 * i) / (particleCount - 1)
        : Math.random() * Math.PI * 2;
      const speed = isBonus
        ? i === 0
          ? 1
          : 2 + Math.random() * 2
        : 1 + Math.random() * 2;

      newParticles.push({
        id,
        x: x + (isBonus && i > 0 ? Math.cos(angle) * 10 : 0),
        y: y + (isBonus && i > 0 ? Math.sin(angle) * 10 : 0),
        value,
        opacity: 1,
        scale: i === 0 ? 1 : 0.5,
        isBonus: isBonusParticle,
        velocityX: Math.cos(angle) * speed * 0.8,
        velocityY: Math.sin(angle) * speed * 1.5 - 3,
        rotation: Math.random() * 30 - 15,
        rotationSpeed: (Math.random() * 2 - 1) * 0.5,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
  };
  const renderParticles = () => (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute font-bold ${
            particle.isBonus
              ? "text-2xl text-yellow-400 drop-shadow-[0_0_4px_rgba(253,224,71,0.7)]"
              : particle.isPassive
                ? "text-sm text-blue-400"
                : particle.value > 0
                  ? "text-xl text-green-500"
                  : "text-xl text-red-500"
          } ${particle.isBonus && !particle.value ? "text-[10px] opacity-80" : ""}`}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%) scale(${particle.scale}) rotate(${particle.rotation}deg)`,
          }}
        >
          {particle.value && particle.isBonus
            ? `+${formatMoney(particle.value)} BONUS!`
            : particle.isPassive && particle.value
              ? `+${formatMoney(particle.value)}/s`
              : particle.value
                ? `+${formatMoney(particle.value)}`
                : particle.isBonus
                  ? "✨"
                  : ""}
        </div>
      ))}
    </div>
  );

  return {
    particles,
    renderParticles,
    addParticle,
    addPassiveParticle,
  };
}
