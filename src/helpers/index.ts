import type {
  ProjectsModuleState,
  RootState,
} from "@store/modules/module_types";
import { Store } from "vuex";
import type {
  RouteLocationNormalizedLoaded,
  RouteParamsGeneric,
  UseLinkReturn,
} from "vue-router";
import { type Ref } from "vue";

const projects: ProjectsModuleState["projects"] = [
  "calliope",
  "ats",
  "shipandco",
  "stockandco",
  "staff",
  "utils",
  "bentoandco",
];

export const checkProjectRoute = (params: RouteParamsGeneric = {}) => {
  const { project_item } = params;
  const routeProject = Array.isArray(project_item)
    ? project_item[0]
    : project_item;

  const isValidProject = projects.find((proj) => proj === routeProject);
  if (!isValidProject) {
    return {
      name: "not-found",
      params: { pathMatch: ["projects", routeProject] },
    };
  }

  return;
};

export const checkExternalPath = ({ path = "" }) => {
  const regex = /^(https?:\/\/|www\.)/;
  return regex.test(path);
};

export const getSectionLinkClassName = ({
  isExactActive,
  isActive,
  exactActiveClass,
  activeClass,
  totalItems,
}: {
  isExactActive: UseLinkReturn["isExactActive"];
  isActive: UseLinkReturn["isActive"];
  exactActiveClass: Ref<string>;
  activeClass: Ref<string>;
  totalItems: number;
}) => {
  let baseClass = ["section-link"];
  if (totalItems <= 2) {
    baseClass = [...baseClass, "force-half-width"];
  }

  if (isExactActive) {
    const computed = (exactActiveClass.value || "").split(" ");
    return [...baseClass, ...computed];
  }
  if (isActive) {
    const computed = (activeClass.value || "").split(" ");
    return [...baseClass, ...computed];
  }
  return baseClass;
};

export const getFormattedTitle = (value: string) => {
  if (value === "ats") {
    return "Bluum Hire";
  }

  const sentenceCase = value.charAt(0).toUpperCase() + value.substring(1);
  const cpyRegexp = /^Bertrand/gi;
  const isBertrand = cpyRegexp.test(sentenceCase);

  return isBertrand ? sentenceCase : sentenceCase.replace(/andco/, "&Co");
};

export const checkProjectPage = (
  store: Store<RootState>,
  route: RouteLocationNormalizedLoaded,
) => {
  if (!store) {
    throw new Error("missing arguments store");
  }

  const projects = (store.getters["projects/getAllProjects"] ||
    []) as ProjectsModuleState["projects"];

  const paramProject = Array.isArray(route?.params?.project_item)
    ? route?.params?.project_item[0]
    : route?.params?.project_item;

  const storeProject = store.getters[
    "projects/getActiveProject"
  ] as ProjectsModuleState["activeProject"];

  const project = paramProject || storeProject;

  if (!projects.length || !project) {
    return false;
  }

  return projects.includes(project);
};
