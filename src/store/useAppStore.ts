import { defineStore } from "pinia";
import { type RootState } from "@store/modules/module_types";

export const useAppStore = defineStore("app", {
  state: (): RootState => ({
    isMobile: false,
    isAndroid: false,
    isToolboxActive: false,
    windowWidth: 0,
  }),
  actions: {
    setMobileDevice({
      isMobile,
      isAndroid,
    }: {
      isMobile: boolean;
      isAndroid: boolean;
    }) {
      this.isMobile = isMobile;
      this.isAndroid = isAndroid;
    },
    setToolBoxState(isToolboxActive: boolean) {
      this.isToolboxActive = isToolboxActive;
    },
    setWindowWidth(windowWidth: number) {
      this.windowWidth = windowWidth;
    },
  },
});
