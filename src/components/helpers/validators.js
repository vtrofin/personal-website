export function generalSectionArrayValidator(value) {
  if (!Array.isArray(value)) {
    return false;
  }
  for (let val of value) {
    if (!val || !val.path || !val.callToAction || !val.title || !val.description) {
      return false;
    }
  }
  return true;
}

// export const appLinkValidator = value => {
//   const { path, to, title } = value;
//   if (!title) {
//     return false;
//   }
//   if (!path) {
//     return false;
//   }
//   if (!path && !to) {
//     return false;
//   }

//   return true;
// };
