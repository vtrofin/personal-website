export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: "Talk",
    description:
      "We start with a conversation about what you need, what\u2019s working, and what isn\u2019t. No jargon, no sales pitch.",
  },
  {
    title: "Plan",
    description:
      "I map out the approach \u2014 what gets built, in what order, and why. You sign off before any code is written.",
  },
  {
    title: "Build",
    description:
      "I work in short cycles, sharing progress as I go. You see real output early, not a finished product months later.",
  },
  {
    title: "Launch",
    description:
      "We ship, verify everything works, and I make sure you can run it without me.",
  },
];
