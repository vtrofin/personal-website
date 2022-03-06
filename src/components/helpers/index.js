import { getFormattedTitle } from '../../helpers';

export const getProjectData = (vuexProjects, store) => {
  return vuexProjects.map(project => {
    const projectData = store.getters[`projects/${project}/getProject`];
    const formatted = getFormattedTitle(project);
    const path = `/projects/${project}`;

    const baseData = {
      path,
      ariaLabel: `View ${formatted} project`,
      callToAction: 'View Project',
      title: formatted,
      excerpt: 'Some random text about this project.',
      type: 'project',
      project,
    };

    return { ...baseData, ...projectData };
  });
};

export const getWorkData = vuexCompanies => {
  return vuexCompanies.map(work => {
    const formatted = getFormattedTitle(work.project);

    return {
      ...work,
      callToAction: 'View Company',
      title: formatted,
    };
  });
};

export const getExplodedContent = (textArr = []) => {
  const getFormattedLine = (textLine = '', i, self) => {
    const split = textLine.split('');

    return split.reduce((acc, char, j, arr) => {
      const isLast = i === self.length - 1 && j === arr.length - 1;
      acc = acc + `<span class="animation-text">${char}</span>`;
      if (isLast) {
        acc = acc + '<div id="animation-blinking-cursor" />';
      }
      return acc;
    }, '');
  };

  return textArr.filter(Boolean).map(getFormattedLine);
};

export const getLastNode = parent => {
  if (!parent) {
    return;
  }
  let ch = parent?.children;
  while (ch.length) {
    if (!ch[ch.length - 1].children.length) {
      return ch[ch.length - 1];
    }
    ch = ch[ch.length - 1].children;
  }

  return ch[ch.length - 1];
};
