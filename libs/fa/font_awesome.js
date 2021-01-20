import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faPython, faJs, faNodeJs, faGithub } from '@fortawesome/free-brands-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const importedIcons = [fas, faUserSecret, faPython, faJs, faNodeJs, faGithub];
library.add(...importedIcons);

export { FontAwesomeIcon };

/*
How to use in code
https://www.npmjs.com/package/@fortawesome/vue-fontawesome
<fa icon="user-secret" />
<fa :icon="['fab', 'twitter']" :class="fa-3x" />

*/
