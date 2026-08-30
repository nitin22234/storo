import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Fade in on scroll / mount
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = 20,
  className = '',
  viewportOnce = true,
  ...props
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: viewportOnce, margin: '-40px' }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Container for staggered children animations
export const StaggerContainer = ({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item (child of StaggerContainer)
export const StaggerItem = ({
  children,
  className = '',
  direction = 'up',
  distance = 18,
  ...props
}) => {
  const yOffset = direction === 'up' ? distance : direction === 'down' ? -distance : 0;
  const xOffset = direction === 'left' ? distance : direction === 'right' ? -distance : 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, x: xOffset },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Interactive Hover Card with Spring physics & subtle glow
export const HoverCard = ({
  children,
  scale = 1.025,
  lift = -4,
  className = '',
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{
        scale,
        y: lift,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Gentle continuous floating motion
export const Floating = ({
  children,
  duration = 3.5,
  distance = 10,
  className = '',
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Animated pulsing glowing badge/button
export const PulseBadge = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 0 0 0 rgba(255, 107, 0, 0.4)',
          '0 0 0 8px rgba(255, 107, 0, 0)',
          '0 0 0 0 rgba(255, 107, 0, 0)',
        ],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Interactive Animated Counter
export const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp = null;
    const target = Number(to) || 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * (target - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};
