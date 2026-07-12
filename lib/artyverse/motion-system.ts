export const artyverseMotion = {
  duration: {
    instant: 0.12,
    quick: 0.18,
    responsive: 0.28,
    expressive: 0.48,
    story: 0.8,
    cinematic: 1.2,
  },
  easing: {
    snap: [0.2, 0.9, 0.25, 1] as const,
    orbit: [0.16, 1, 0.3, 1] as const,
    linear: [0, 0, 1, 1] as const,
  },
  spring: {
    tactile: { type: "spring" as const, stiffness: 430, damping: 30, mass: 0.7 },
    soft: { type: "spring" as const, stiffness: 220, damping: 28, mass: 0.9 },
  },
} as const

export type ArtyverseMotionFamily =
  | "orbit"
  | "snap"
  | "squish"
  | "float"
  | "warp"
  | "mischief"
  | "reward"
  | "lock"

export type ArtyverseMotionIntent =
  | "hierarchy"
  | "state"
  | "causality"
  | "reward"
  | "guidance"
  | "confirmation"

export interface ArtyverseMotionContract {
  family: ArtyverseMotionFamily
  intent: ArtyverseMotionIntent
  decorative?: boolean
  pauseOffscreen?: boolean
  mobileEnabled?: boolean
}

export const motionContracts: Record<ArtyverseMotionFamily, ArtyverseMotionContract> = {
  orbit: { family: "orbit", intent: "guidance", decorative: false, pauseOffscreen: true, mobileEnabled: true },
  snap: { family: "snap", intent: "causality", mobileEnabled: true },
  squish: { family: "squish", intent: "confirmation", mobileEnabled: true },
  float: { family: "float", intent: "hierarchy", decorative: true, pauseOffscreen: true, mobileEnabled: false },
  warp: { family: "warp", intent: "hierarchy", mobileEnabled: true },
  mischief: { family: "mischief", intent: "guidance", decorative: true, pauseOffscreen: true, mobileEnabled: true },
  reward: { family: "reward", intent: "reward", mobileEnabled: true },
  lock: { family: "lock", intent: "confirmation", mobileEnabled: true },
}
