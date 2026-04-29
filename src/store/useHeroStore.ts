import { defineStore } from "pinia";
import type { HeroModuleState } from "@store/modules/module_types";
import { heroData } from "../data/hero";

export const useHeroStore = defineStore("hero", {
  state: (): HeroModuleState => ({
    bashHistory: [],
    staticText: "$",
    coordinates: { x: null, y: null },
    animationTextLines: heroData.animationTextLines,
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
