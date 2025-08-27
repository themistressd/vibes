import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../common/Button';
import { useAppStore } from '../../stores/appStore';

interface BingoRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(motion.div)`
  background: ${(props) => props.theme.current.colors.background};
  border-radius: ${(props) => props.theme.common.borderRadius.large};
  padding: ${(props) => props.theme.common.spacing.lg};
  width: 90%;
  max-width: 320px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.current.colors.text};
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 0 0 ${(props) => props.theme.common.spacing.md} 0;
  color: ${(props) => props.theme.current.colors.text};
`;

const Message = styled.p`
  margin-bottom: ${(props) => props.theme.common.spacing.lg};
  color: ${(props) => props.theme.current.colors.text};
`;

export const BingoRewardModal: React.FC<BingoRewardModalProps> = ({ isOpen, onClose }) => {
  const unlockBingoBadge = useAppStore((state) => state.unlockBingoBadge);
  const [Confetti, setConfetti] = useState<React.ComponentType<unknown> | null>(null);

  useEffect(() => {
    let interval: number | undefined;
    if (isOpen && typeof window !== 'undefined') {
      import('react-confetti').then((mod) => setConfetti(() => mod.default));
      import('canvas-confetti').then((mod) => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        interval = window.setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0 && interval) {
            window.clearInterval(interval);
            return;
          }

          const particleCount = 50 * (timeLeft / duration);
          mod.default({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          mod.default({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      });
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    unlockBingoBadge();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {Confetti && (
            <Confetti recycle={false} numberOfPieces={800} gravity={0.3} />
          )}
          <ModalContent
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </CloseButton>
            <Title>Bingo!</Title>
            <Message>You have liked all vibes. Badge unlocked!</Message>
            <Button onClick={handleClose}>Cerrar</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default BingoRewardModal;
