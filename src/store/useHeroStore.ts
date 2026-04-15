import { defineStore } from "pinia";
import type { HeroModuleState } from "@store/modules/module_types";

export const useHeroStore = defineStore("hero", {
  state: (): HeroModuleState => ({
    bashHistory: [],
    staticText: "$",
    coordinates: { x: null, y: null },
    animationTextLines: [
      "$ whoami",
      "I shape ideas into practical software focusing on accessibility and performance.",
      "I ensure high-quality outcomes by following industry recognized best practices.",
      "My primary tech stack includes TypeScript, Node.js and ReScript.",
      "I have foundational knowledge in Rust and Swift.",
      "I thrive in interdisciplinary teams, bringing out my best work through close collaboration.",
    ],
  }),
  actions: {
    pushLine(text: string) {
      this.bashHistory = [...this.bashHistory, text];
    },
    updateCoordinates({
      x,
      y,
    }: {
      x: number | null;
      y: number | null;
    }) {
      this.coordinates = {
        x: !!x || x === 0 ? x : this.coordinates.x,
        y: !!y || y === 0 ? y : this.coordinates.y,
      };
    },
  },
});
