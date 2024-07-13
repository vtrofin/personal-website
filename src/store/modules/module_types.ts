export interface Project {
  type: string;
  backgroundClass?: string;
  excerpt: string;
  item_title: string;
  role: string;
}

export interface RootState {
  isMobile: boolean;
  isAndroid: boolean;
  isToolboxActive: boolean;
  windowWidth: number;
}

export interface ProjectsRootState {
  projects: string[];
  activeProject: string;
  // ats: Project;
  // shipandco: Project;
  // stockandco: Project;
  // staff: Project;
  // utils: Project;
  // bentoandco: Project;
  // calliope: Project;
}

export interface ProjectState {
  project: Project;
}
