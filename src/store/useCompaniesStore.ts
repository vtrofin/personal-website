import { defineStore } from "pinia";
import type { CompaniesModuleState } from "@store/modules/module_types";

export const useCompaniesStore = defineStore("companies", {
  state: (): CompaniesModuleState => ({
    companies: [
      {
        project: "scoville",
        type: "work",
        item_title: "",
        excerpt: "Full-stack web engineer within the AI team",
        path: "https://scoville.jp/",
        ariaLabel: "View Scoville's website",
      },
      {
        project: "bertrandco",
        type: "work",
        item_title: "",
        excerpt: "Full-stack web engineer",
        path: "https://bertrandco.com/",
        ariaLabel: "View Bertrand Co website",
      },
    ],
  }),
});
