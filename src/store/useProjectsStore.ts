import { defineStore } from "pinia";
import { allProjects, type ProjectName } from "src/globals";
import type { Project, ProjectsModuleState } from "@store/modules/module_types";

type ProjectsState = ProjectsModuleState & {
  projectsData: Record<ProjectName, Project>;
};

export const useProjectsStore = defineStore("projects", {
  state: (): ProjectsState => ({
    projects: allProjects,
    activeProject: "",
    projectsData: {
      ats: {
        type: "project",
        backgroundClass: "ats-background",
        excerpt:
          "Applicant tracking system for handling job applications and hiring",
        item_title: "Bluum Hire",
        role: "Full-stack web engineer",
      },
      shipandco: {
        type: "project",
        logoClass: "shipandco-logo",
        backgroundClass: "shipandco-background",
        excerpt: "Shipping management solution for eCommerce",
        item_title: "Ship&Co",
        role: "Full-stack web engineer",
      },
      stockandco: {
        type: "project",
        logoClass: "stockandco-logo",
        backgroundClass: "stockandco-background",
        excerpt: "Sync inventory in real time across multiple Shopify stores",
        item_title: "Stock&Co",
        role: "Full-stack web engineer",
      },
      staff: {
        type: "project",
        excerpt: "Internal dashboard to monitor operations in Ship&co",
        item_title: "Staff Dashboard",
        role: "Full-stack web engineer",
      },
      utils: {
        type: "project",
        excerpt: "A set of developer tools to create test data",
        item_title: "Ship&Co Utils",
        role: "",
      },
      bentoandco: {
        type: "project",
        logoClass: "bentoandco-logo",
        backgroundClass: "bentoandco-background",
        excerpt: "Shopify online store selling bento boxes from Kyoto",
        item_title: "Bento&Co Shopify stores",
        role: "",
      },
      calliope: {
        type: "project",
        backgroundClass: "calliope-background",
        excerpt: "AI powered call center",
        item_title: "Calliope AI",
        role: "Full-stack web engineer",
      },
    },
  }),
  getters: {
    getProjectByName:
      (state) =>
      (name: ProjectName): Project => {
        const project = state.projectsData[name];

        if (!project) {
          throw new Error(`Project not found: ${name}`);
        }

        return project;
      },
  },
  actions: {
    setActiveProject(project: string) {
      this.activeProject = project;
    },
  },
});
