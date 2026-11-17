import { config, library } from "@fortawesome/fontawesome-svg-core";

// The injected style tag is blocked by style-src 'self'.
config.autoAddCss = false
import {
  fas,
  faTools,
  faEnvelope,
  faHome,
  faInfoCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faJs,
  faGithub,
  faSwift,
  faRust,
} from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const importedIcons = [
  fas,
  far,
  faEnvelope,
  faSwift,
  faJs,
  faRust,
  faGithub,
  faTools,
  faHome,
  faInfoCircle,
  faUser,
];
library.add(...importedIcons);

export { FontAwesomeIcon };
