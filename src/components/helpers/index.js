// import { h } from 'vue';
// import { useLink } from 'vue-router';

// export const getAHref = dataItem => {
//   const { path, ariaLabel, callToAction, title, description, logo, background } = dataItem;
//   //   ? h('a', {
//   //     href: item.path,
//   //     ariaLabel: item.ariaLabel
//   //   })
//   // : h('router-link');
//   return h(
//     'a',
//     { href: path, ariaLabel, class: 'general-section-link' },
//     'Some random link url text'
//   );
// };

// export const getRouterLink = (dataItem, RouterLink) => {
//   const { path, ariaLabel, callToAction, title, description, logo, background } = dataItem;
//   console.log(useLink);
//   // ariaLabel, class: 'general-section-link'
//   return h(useLink, { props: { to: path } });

//   /*

//  <router-link to="#">
//           <span class="nav-link-text">Work</span>
//         </router-link>
// */
// };

// const sectionProps = { class: [props.className, 'general-section'] };
//   const h2Props = { class: 'section-header' };
//   return () => {
//     return h('section', sectionProps, [
//       h('h2', h2Props, props.title),
//       ...data.value.map(item => {
//         const isExternal = checkExternalPath(item);
//         return isExternal ? getLinkElement(item) : getRouterLink(item);
//       })
//     ]);
//   };

// import { checkExternalPath } from '../../helpers';
// import { getAHref, getRouterLink } from '../helpers';
// import { RouterLink } from 'vue-router';
