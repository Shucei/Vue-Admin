/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'path-browserify';
// declare module '*.scss' {
//   const content: { [className: string]: string };
//   export default content;
// }
