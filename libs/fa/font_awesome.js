import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fas,
  faTools,
  faEnvelope,
  faHome,
  faInfoCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faPython, faJs, faNodeJs, faGithub } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const importedIcons = [
  fas,
  far,
  faEnvelope,
  faPython,
  faJs,
  faNodeJs,
  faGithub,
  faTools,
  faHome,
  faInfoCircle,
  faUser,
];
library.add(...importedIcons);

export { FontAwesomeIcon };
