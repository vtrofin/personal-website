import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faPython, faJs, faNodeJs } from '@fortawesome/free-brands-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
// import FontAwesomeIcon from './FontAwesomeIcon.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas, faUserSecret, faPython, faJs, faNodeJs);

export { FontAwesomeIcon };

/*
How to use in code
<fa icon="user-secret" />
<fa :icon="['fab', 'twitter']" />

*/
