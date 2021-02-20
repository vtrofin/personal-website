const matchTitle = route => {
  const meta = route?.meta;
  return typeof meta === 'function' ? meta(route)?.title : meta?.title;
};

const getMeta = (nearestWithTitle, to) => {
  return typeof nearestWithTitle?.meta === 'function'
    ? nearestWithTitle?.meta(to)
    : nearestWithTitle?.meta ?? {};
};

export const handleMetaTags = (to, from, next) => {
  const nearestWithTitle = (to?.matched ?? [])
    .slice()
    .reverse()
    .find(matchTitle);

  // remove old meta tags on route change
  const stale = document.querySelectorAll('[data-vue-router-controlled]');
  for (let staleTag of stale) {
    staleTag.parentNode.removeChild(staleTag);
  }

  if (!nearestWithTitle) {
    return next();
  }

  // put new meta
  const { metaTags = [], title } = getMeta(nearestWithTitle, to);
  if (!title || !metaTags.length) {
    return next();
  }
  document.title = title;
  for (let metaTag of metaTags) {
    const tag = document.createElement('meta');
    Object.keys(metaTag).forEach(key => {
      tag.setAttribute(key, metaTag[key]);
    });
    tag.setAttribute('data-vue-router-controlled', '');
    document.head.appendChild(tag);
  }

  return next();
};

export const metaTags = {
  notFound: [
    {
      name: 'description',
      content: `This is a little embarassing. I can't find the page you are looking for`,
    },
    {
      name: 'keywords',
      content: 'React, Vue.js, Node.js, full stack, web engineer, developer, Kyoto, Japan',
    },
  ],
  homePage: [
    {
      name: 'description',
      content: 'I build web apps for e-commerce and logistics, in Japan.',
    },
    {
      name: 'keywords',
      content: 'React, Vue.js, Node.js, full stack, web engineer, developer, Kyoto, Japan',
    },
    { name: 'og:title', content: 'My name is Victor. I am a web engineer in Kyoto' },
    {
      name: 'og:description',
      content:
        'My area of expertise lies in building systems for e-commerce and logistics. I work at Ship&co, building a shipping management solution for e-commerce.',
    },
    { name: 'og:url', content: 'https://trofin.me' },
    { name: 'og:site_name', content: `Victor Trofin's portfolio` },
    { name: 'og:type', content: 'website' },
    { name: 'og:image', content: 'https://trofin.me/og_image.jpg' },
  ],
  project: route => {
    return [
      {
        name: 'description',
        content: `Full-stack web development for ${route?.params?.project_item ??
          'e-commerce and logistics'} project with Node.js, Meteor, React, Vue.js and Feathers js`,
      },
      {
        name: 'keywords',
        content: `${route?.params?.project_item}, React, Vue.js, Node.js, Meteor, full stack, web engineer, developer, Kyoto, Japan`,
      },
    ];
  },
  contact: [
    { name: 'description', content: 'Contact me for a quote on your project' },
    { name: 'keywords', content: 'contact, full stack, web engineer, developer, Kyoto, Japan' },
  ],
};
