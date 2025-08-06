// // src/hooks.server.ts
// export const handle = async ({ event, resolve }) => {
//   console.log('origin header:', event.request.headers.get('origin'));
//   console.log('url.origin:', event.url.origin);
//   return resolve(event);
// };
// Used to test for CSRF issues and same-origin mismatches