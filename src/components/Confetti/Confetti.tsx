import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export default function Confetti({ active, onComplete }: ConfettiProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (active && !hasTriggered.current) {
      hasTriggered.current = true;

      const duration = 1000;
      const animationEnd = Date.now() + duration;
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#88ff00'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          disableForReducedMotion: true,
          scalar: 1.2
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          disableForReducedMotion: true,
          scalar: 1.2
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        } else {
          onComplete?.();
        }
      };

      frame();
    }

    return () => {
      confetti.reset();
    };
  }, [active, onComplete]);

  return null;
}
