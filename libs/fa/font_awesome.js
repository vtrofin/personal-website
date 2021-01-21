import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faTools, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { faPython, faJs, faNodeJs, faGithub } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const importedIcons = [fas, far, faEnvelope, faPython, faJs, faNodeJs, faGithub, faTools, faHome];
library.add(...importedIcons);

export { FontAwesomeIcon };

/*
How to use in code
https://www.npmjs.com/package/@fortawesome/vue-fontawesome
<fa icon="user-secret" />
<fa :icon="['fab', 'twitter']" :class="fa-3x" />

*/
