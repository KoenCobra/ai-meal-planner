import { Variants } from "framer-motion";

// Animation variants - snappy and quick
export const cardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const imageContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

export const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.2,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 600,
      damping: 30,
    },
  },
};

export const cardVariants2: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

// Common transition configurations
export const transitions = {
  // Quick fade transition
  quickFade: {
    duration: 0.2,
  },
  // Spring transition for interactive elements
  spring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 20,
  },
  // Smooth spring for buttons
  smoothSpring: {
    type: "spring" as const,
    stiffness: 600,
    damping: 30,
  },
  // Stagger children animation
  stagger: {
    staggerChildren: 0.03,
  },
  // Delayed animation
  delayed: (delay: number = 0.1) => ({
    delay,
    duration: 0.2,
  }),
} as const;

// Common motion values for interactive elements
export const motionValues = {
  // Scale effect for buttons and interactive elements
  buttonHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: transitions.spring,
  },
  // Tap effect for clickable items
  tap: {
    whileTap: { scale: 0.95 },
    transition: transitions.spring,
  },
  // Card hover effect
  cardHover: {
    whileHover: {
      scale: 1.02,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.1 },
    },
  },
} as const;

// Common component animations
export const componentVariants = {
  // Fade in from bottom
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.quickFade,
    },
  },
  // Fade in from top
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.quickFade,
    },
  },
  // Scale fade in
  scaleFadeIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transitions.spring,
    },
  },
  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: transitions.quickFade,
    },
  },
} as const;
