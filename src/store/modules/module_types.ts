export interface HeroModuleState {
  bashHistory: string[];
  staticText: string;
  coordinates: {
    x: number | null;
    y: number | null;
  };
  animationTextLines: string[];
}

export interface ToolsModuleState {
  frontEnd: string[];
  backEnd: string[];
  staticSiteGens: string[];
  other: string[];
  compiled: string[];
  devops: string[];
}

export interface Company {
  project: string;
  type: string;
  item_title: string;
  logoClass?: string;
  excerpt: string;
  path: string;
  ariaLabel: string;
}

export interface CompaniesModuleState {
  companies: Company[];
}

export interface Project {
  type: string;
  backgroundClass?: string;
  logoClass?: string;
  excerpt: string;
  item_title: string;
  role: string;
}

export interface ProjectState {
  project: Project;
}

export interface ProjectsModuleState {
  projects: string[];
  activeProject: string;
}

export interface RootState {
  isMobile: boolean;
  isAndroid: boolean;
  isToolboxActive: boolean;
  windowWidth: number;
}
